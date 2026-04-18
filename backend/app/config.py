from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    database_url: str = "postgresql://postgres:postgres@localhost:5432/sparkle_media"
    redis_url: str = "redis://localhost:6379/0"
    secret_key: str = "your-secret-key-change-this-in-production"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 30

    # AI API Keys
    openai_api_key: str = ""
    seedance_api_key: str = ""

    # File Upload
    upload_dir: str = "uploads"
    max_file_size: int = 10485760  # 10MB

    class Config:
        env_file = ".env"
        case_sensitive = False

settings = Settings()
