const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export interface ContactInfo {
  id: number;
  email: string;
  phone: string;
  address_uz: string;
  address_en: string;
  address_ru: string;
  is_active: boolean;
}

export interface SocialLink {
  id: number;
  platform: 'telegram' | 'github' | 'email' | 'phone';
  url: string;
  label: string;
  order: number;
  is_active: boolean;
}

export interface Article {
  id: number;
  title_uz: string;
  title_en: string;
  title_ru: string;
  excerpt_uz: string;
  excerpt_en: string;
  excerpt_ru: string;
  author: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  read_time: string;
  is_published: boolean;
  created_at: string;
}

export interface Video {
  id: number;
  title_uz: string;
  title_en: string;
  title_ru: string;
  duration: string;
  views: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string | null;
  video_url: string | null;
  is_published: boolean;
  created_at: string;
}

export interface Test {
  id: number;
  title_uz: string;
  title_en: string;
  title_ru: string;
  questions_count: number;
  duration: number;
  difficulty: 'easy' | 'medium' | 'hard';
  stars: number;
  is_published: boolean;
  created_at: string;
}

export interface Game {
  id: number;
  title_uz: string;
  title_en: string;
  title_ru: string;
  description_uz: string;
  description_en: string;
  description_ru: string;
  icon: string;
  players_count: number;
  difficulty: 'easy' | 'medium' | 'hard';
  xp_reward: number;
  is_published: boolean;
  created_at: string;
}

export interface FooterInfo {
  id: number;
  author_name: string;
  creator_name: string;
  is_active: boolean;
}

class ApiService {
  private async fetchApi<T>(endpoint: string, options?: RequestInit): Promise<T> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          'Content-Type': 'application/json',
          ...options?.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // Contact Info
  async getContactInfo(): Promise<ContactInfo | null> {
    try {
      const data = await this.fetchApi<ContactInfo[]>('/contact/');
      return data.length > 0 ? data[0] : null;
    } catch {
      return null;
    }
  }

  // Social Links
  async getSocialLinks(): Promise<SocialLink[]> {
    try {
      return await this.fetchApi<SocialLink[]>('/social-links/');
    } catch {
      return [];
    }
  }

  // Articles
  async getArticles(): Promise<Article[]> {
    try {
      return await this.fetchApi<Article[]>('/articles/');
    } catch {
      return [];
    }
  }

  // Videos
  async getVideos(): Promise<Video[]> {
    try {
      return await this.fetchApi<Video[]>('/videos/');
    } catch {
      return [];
    }
  }

  async incrementVideoViews(videoId: number): Promise<void> {
    try {
      await this.fetchApi(`/videos/${videoId}/increment_views/`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to increment video views:', error);
    }
  }

  // Tests
  async getTests(): Promise<Test[]> {
    try {
      return await this.fetchApi<Test[]>('/tests/');
    } catch {
      return [];
    }
  }

  // Games
  async getGames(): Promise<Game[]> {
    try {
      return await this.fetchApi<Game[]>('/games/');
    } catch {
      return [];
    }
  }

  async incrementGamePlayers(gameId: number): Promise<void> {
    try {
      await this.fetchApi(`/games/${gameId}/increment_players/`, {
        method: 'POST',
      });
    } catch (error) {
      console.error('Failed to increment game players:', error);
    }
  }

  // Footer Info
  async getFooterInfo(): Promise<FooterInfo | null> {
    try {
      const data = await this.fetchApi<FooterInfo[]>('/footer/');
      return data.length > 0 ? data[0] : null;
    } catch {
      return null;
    }
  }
}

export const apiService = new ApiService();

