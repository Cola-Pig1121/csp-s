plugin.exports = class PixivBookSource {
    static ID = "pixivSourceID";
    static TYPE = plugin.type.BOOK_SOURCE;
    static GROUP = "Pixiv";
    static NAME = "Pixiv 小说源";
    static VERSION = "1.0.0";
    static VERSION_CODE = 1;
    static PLUGIN_FILE_URL = "https://raw.githubusercontent.com/Cola-Pig1121/csp-s/refs/heads/main/pixiv.ts.js";
    static BASE_URL = "https://www.pixiv.net";

    constructor({ request, store, cheerio, nanoid }: { request: any; store: any; cheerio: any; nanoid: any }) {
        this.request = request;
        this.store = store;
        this.cheerio = cheerio;
        this.nanoid = nanoid;
    }

    async search(keyword: string): Promise<any[]> {
        const searchUrl = `https://www.pixiv.net/ajax/search/novels/${encodeURIComponent(keyword)}?word=${encodeURIComponent(keyword)}&order=date_d&mode=all&p=1&s_mode=s_tag&lang=zh`;
        const response = await this.request.get(searchUrl);
        const result = JSON.parse(response.body);
        
        const novels = result.body.novel.data.map((novel: any) => ({
            bookname: novel.title,
            author: novel.userName,
            coverImageUrl: novel.coverUrl,
            detailPageUrl: novel.detailedUrl
        }));

        return novels;
    }

    async getDetail(detailPageUrl: string): Promise<any> {
        const response = await this.request.get(detailPageUrl);
        const result = JSON.parse(response.body);
        const novel = result.body;

        const chapters = await this.getChapters(novel.id);
        
        return {
            bookname: novel.title,
            author: novel.userName,
            coverImageUrl: novel.coverUrl,
            latestChapterTitle: novel.latestChapter,
            chapterList: chapters
        };
    }

    async getTextContent(chapterUrl: string): Promise<string> {
        const response = await this.request.get(chapterUrl);
        const result = JSON.parse(response.body);
        const content = result.body.content;

        return content;
    }

    async getChapters(novelId: string): Promise<any[]> {
        const seriesUrl = `https://www.pixiv.net/ajax/novel/series/${novelId}?lang=zh`;
        const response = await this.request.get(seriesUrl);
        const result = JSON.parse(response.body);
        const series = result.body;

        const chapters = series.thumbnails.novel.map((chapter: any) => ({
            title: chapter.title,
            url: `https://www.pixiv.net/ajax/novel/${chapter.id}`
        }));

        return chapters;
    }
};
