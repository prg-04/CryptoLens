import getNews from './newsApi';

describe('getNews function', () => {
  global.fetch = jest.fn();

  beforeEach(() => {
    fetch.mockReset();
  });

  it('should fetch data successfully', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ newsData: 'some data' }),
    });

    const url = 'https://example.com/api/news';

    const data = await getNews(url);

    expect(fetch).toHaveBeenCalledWith(url);

    expect(data).toEqual({ newsData: 'some data' });
  });

  it('should handle network errors', async () => {
    fetch.mockRejectedValueOnce(new Error('Network error'));

    const url = 'https://example.com/api/news';

    await expect(getNews(url)).rejects.toThrow('Error fetching data:');

    expect(fetch).toHaveBeenCalledWith(url);
  });

  it('should handle non-ok responses', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found',
    });

    const url = 'https://example.com/api/news';

    await expect(getNews(url)).rejects.toThrow('Error fetching data:');

    expect(fetch).toHaveBeenCalledWith(url);
  });
});
