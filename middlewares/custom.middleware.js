
const requestLogger = (req, res, next) => {
    req.currentDate = new Date();

    if (req.method === 'GET') {
        console.log(`[${req.currentDate.toISOString()}] GET request received to: ${req.url}`);
    }
    next();
};


const timeRestrictor = (req, res, next) => {
    const now = new Date();
    const day = now.getDay(); 
    const hour = now.getHours();

    const isWeekend = (day === 5 && hour >= 12) || day === 6;
    const isNight = hour >= 22 || hour < 6;

    if (isWeekend || isNight) {
        return res.status(403).json({ 
            message: "הגישה לשרת חסומה בשעות הלילה ובסופי שבוע. נא לנסות שוב בשעות הפעילות ." 
        });
    }

    next();
};

module.exports = {
    requestLogger,
    timeRestrictor
};