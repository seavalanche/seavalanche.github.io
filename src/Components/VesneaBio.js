import List from '../data/VesneaBio.json';
import '../css/main.css'

export default function VesneaBio() {
    return (
        <div>
            <div className="LP-card-title">Vesnea's Bio</div>
            <div className="bio-list">
                {List.map((list, i) => (
                    <div key={i} className={`list-item ${list.topic}`}>
                        <span className={`bio-list-topic`}>{list.topic}</span>
                        <span>:</span>
                        <span className={`bio-list-content`}>{list.content}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
