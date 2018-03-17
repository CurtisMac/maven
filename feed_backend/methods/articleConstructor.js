function ArticleObj(title, authors, url, pubDate, summary, lang, srcType, srcTitle, srcUrl, tags, bklinks) {
    this.title = title;
    this.authors = authors;
    this.url = url;
    this.pubDate = pubDate;
    this.summary = summary;
    this.lang = lang;
    this.srcType = srcType;
    this.srcTitle = srcTitle;
    this.srcUrl = srcUrl;
    this.tags = tags;
    //bklinks is only here as a workaround for API trial version limitations
    this.bklinks = bklinks;
}

module.exports = ArticleObj