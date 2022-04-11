// add, sub, mul, scalar mul, scalar part, vector part unit vector, magnitude,
// reciprocal, conjugate, conjugateWith ( pqp-1 curry),

const q = (s, vi, vj, vk) => [s, vi || 0, vj || 0, vk || 0];

q.add = function ([s, vi, vj, vk], [t, ui, uj, uk]) {
    return [s + t, vi + ui, vj + uj, vk + uk];
};

q.sub = function ([s, vi, vj, vk], [t, ui, uj, uk]) {
    return [s - t, vi - ui, vj - uj, vk - uk];
};

q.mul = function ([s, vi, vj, vk], [t, ui, uj, uk]) {
    return [
        s * t - vi * ui - vj * uj - vk * vk,
        s * ui + vi * t + vj * uk - vk * uj,
        s * uj - vi * uk + vj * t + vk * ui,
        s * uk + vi * uj - vj * ui + vk * t
    ];
};

q.scalar = function ([s, vi, vj, vk], n) {
    return [s * n, vi * n, vj * n, vk * n];
};

q.mag = (quaternion) => Math.hypot(...quaternion);

q.conjugate = function ([s, vi, vj, vk]) {
    return [s, -vi, -vj, -vk];
};

q.inverse = function (quaternion) {
    const magnitude = q.mag(quaternion);
    return q.scalar(q.conjugate(quaternion), 1 / magnitude * magnitude);
};

q.conjugateWith = (quaternionQ) => (quaternionP) => q.mul(
    q.mul(quaternionP, quaternionQ),
    q.inverse(quaternionP)
);
