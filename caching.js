import NodeCache from "node-cache";

const cache = new NodeCache({
    stdTTL: 100,
    checkperiod: 120
});

// Middleware Function
cache.cacheMiddleware = (duration) => {
    return (req, res, next) => {
        const key = req.originalUrl || req.url;
        const cachedResponse = cache.get(key);

        if (cachedResponse) {
            res.send(cachedResponse);
            return;
        }

        const originalSend = res.send;
        res.send = function(body) {
            cache.set(key, body, duration);
            originalSend.call(this, body);
        };

        next();
    };
};


export default cache;