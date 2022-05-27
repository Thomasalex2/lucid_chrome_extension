import { useState, useEffect } from "react"

export const QuoteComponent = () => {
    
    const [quote, setQuote] = useState({});
    
    const getQuote = () => {
        const Quotes = require("randomquote-api");
        const randomQuote = Quotes.randomQuote();
        setQuote(randomQuote);
    }
    useEffect(() => getQuote(), [])
    return (
        <>
            <p className="quote-text"><i>{quote.quote}</i></p>
            <small className="quote-author">-{quote.author}</small><br />
        </>
    )
}