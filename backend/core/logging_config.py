import logging
import sys

def setup_logging():
    """
    Sets up structured logging format for the application.
    Configures stream handlers for standard container-friendly logs.
    """
    logger = logging.getLogger("aperture")
    logger.setLevel(logging.INFO)
    
    # Avoid duplicate handlers if setup is called multiple times
    if not logger.handlers:
        handler = logging.StreamHandler(sys.stdout)
        formatter = logging.Formatter(
            "[%(asctime)s] %(levelname)s in %(module)s: %(message)s"
        )
        handler.setFormatter(formatter)
        logger.addHandler(handler)
        
    # Also configure third party loggers to minimize noise
    logging.getLogger("uvicorn.access").setLevel(logging.WARNING)
    logging.getLogger("uvicorn.error").setLevel(logging.INFO)
    
    return logger

# Singleton instance of the logger
logger = setup_logging()
