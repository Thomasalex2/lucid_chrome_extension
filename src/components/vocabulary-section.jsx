import { useState, useEffect } from "react"
import { urls } from "../configs"

export const VocabularyComponent = () => {
    
    const [vocab, setVocab] = useState({});

    const getVocab = () => {
        const vocabList = require("./../word_list/words.json");
        const randomVocab = vocabList[Math.floor(Math.random() * vocabList.length)];
        setVocab(randomVocab);
    }

    useEffect(() => getVocab(), [])

    return (
        <a className="vocab-text" href={`${urls.dictionaryUserUrl}${vocab.word}`} target="_blank" rel="noreferrer">
            <p className="vocab-label"> Word of the tab</p>
            <small className="vocab-word">{vocab.word}:&nbsp;&nbsp;</small>
            <small className="vocab-definition">{vocab.meaning}</small><br />
            <small className="vocab-example"><i><b>Usage:&nbsp;</b>{vocab.sentence}</i></small>
        </a>
    )
}