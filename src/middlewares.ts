import { AccuweatherError } from "./accuweather/accuweather-error";

function accuweatherErrorMiddleware(error, req, res, next) {
  if (!(error instanceof AccuweatherError)) {
    next(error);
  }
  
  console.error(error);

  res.status(502).json({
    error: "Service unavailable. Please try again later",
  });
}

function errorMiddleware(error, req, res, next) {
  console.error(error);
  const stautsCode = 500;
  const message = "An unknown error uccoured";

  res.status(stautsCode).json({
    error: message
  });
}

export {
  accuweatherErrorMiddleware,
  errorMiddleware,
}
