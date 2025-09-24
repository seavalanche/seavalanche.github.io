import { useEffect, useState } from "react";
import '../css/main.css'

function NewsSection() {
    const [news, setNews] = useState([]);
    const [tags, setTags] = useState([]);
    const [activeTag, setActiveTag] = useState("all");

    useEffect(() => {
        fetch("https://docs.google.com/spreadsheets/d/e/2PACX-1vRoAMFHpL_b4OtqO4Dwe02_A_YTw5HnQjKdtwX00yPh4S_N4EhQZpiQ4fAYplVL-H5bt_SwoQurzbcM/pub?output=csv")
            .then(res => res.text())
            .then(text => {
                const rows = text.split("\n").slice(1); // skip header
                const parsed = rows.map(row => {
                    const [title, date, content, image, tags] = row.split(",");
                    const tagList = tags ? tags.split(";").map(t => t.trim()) : [];
                    return { title, date, content, image, tags: tagList };
                });
                setNews(parsed);

                // Sort newest to oldest
                parsed.sort((a, b) => new Date(b.date) - new Date(a.date));

                setNews(parsed);

                // Collect unique tags
                const allTags = parsed.flatMap(item => item.tags);
                setTags(["all", ...new Set(allTags)]);
            });
    }, []);

    // Filter by tag
    const filteredNews =
        activeTag === "all"
            ? news
            : news.filter(item => item.tags.includes(activeTag));

    return (
        <div className="NS-container">
            <div className="NS-container-title">News Feed</div>
            <div className="NS-tagfilters">
                {tags.map((tag, i) => (
                    <button
                        key={i}
                        onClick={() => setActiveTag(tag)}
                        className={`NS-tagfilters-btn ${activeTag === tag ? "" : ""}`}
                    >
                        {tag}
                    </button>
                ))}
            </div>
            <div className="NS-feed">
                {filteredNews.map((item, i) => (
                    <div
                        key={i}
                        className="NS-article"
                    >
                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.title}
                                className="NS-image"
                            />
                        )}

                        <div className="NS-header">
                            <div className="NS-title">{item.title}</div>
                            <div className="NS-date">{item.date}</div>
                        </div>
                        <div className="NS-content">{item.content}</div>

                        <div className="NS-tags">
                            {item.tags.map((tag, j) => (
                                <span
                                    key={j}
                                    className="NS-tag"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default NewsSection;
