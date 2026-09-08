module.exports = (schema) => {
  return (req, res, next) => {
    const errors = [];

    for (const field of schema.required || []) {
      if (!req.body[field]) {
        errors.push(`Le champ '${field}' est requis.`);
      }
    }

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
};
