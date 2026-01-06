import * as urlService from "../services/url.service.js";

export const createShortUrl = async (req, res, next) => {
  try {
    const { original } = req.body;
    const userId = req.user.id;
    const url = await urlService.createShortUrl(userId, original);
    res.json({
      original: url.original,
      shortCode: url.shortCode,
      shortUrl: `${process.env.BASE_URL || req.protocol + '://' + req.get('host')}/${url.shortCode}`,
      createdAt: url.createdAt,
      clicks: url.clicks,
      id: url.id,
    });
  } catch (err) {
    if (err.code === "LIMIT_REACHED") {
      return res.status(403).json({ message: err.message });
    }
    next(err);
  }
};

export const listUserUrls = async (req, res, next) => {
  try {
    const urls = await urlService.listUserUrls(req.user.id);
    res.json(urls.map(url => ({
      id: url.id,
      original: url.original,
      shortCode: url.shortCode,
      shortUrl: `${process.env.BASE_URL || req.protocol + '://' + req.get('host')}/${url.shortCode}`,
      createdAt: url.createdAt,
      clicks: url.clicks,
    })));
  } catch (err) {
    next(err);
  }
};

export const deleteUrl = async (req, res, next) => {
  try {
    const deleted = await urlService.deleteUrl(req.user.id, req.params.id);
    if (deleted.count === 0) return res.status(404).json({ message: "Not found or unauthorized" });
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const handleRedirect = async (req, res, next) => {
  try {
    const url = await urlService.findByShortCode(req.params.shortCode);
    if (!url) return res.status(404).send("URL not found");
    await urlService.incrementClick(url.id);
    res.redirect(url.original);
  } catch (err) {
    next(err);
  }
};