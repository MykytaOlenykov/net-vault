import ApiClient from "../ApiClient";
import type { AxiosResponse } from "axios";

type TagsResponse = {
  data: {
    tags: string[];
  };
};

class TagService extends ApiClient {
  async getTags(): Promise<string[]> {
    const response: AxiosResponse<TagsResponse> = await this.get<TagsResponse>(
      "/devices/tags",
    );
    return response.data.data.tags;
  }
}

export const tagService = new TagService();
