import React, {useState, useEffect, useRef} from 'react';
import News from './News';
import './NewsApp.css';

function NewsApp() {
    const [newsList, setNewsList] = useState([]);
	const [query, setQuery] = useState('tesla');
	const queryInputRef = useRef(null);

    const apikey = '1fd82ab0cd324f0794db55990f8273b8';
	const apiUrl = `https://newsapi.org/v2/everything?q=${query}&from=2023-06-27&sortBy=publishedAt&apiKey=${apikey}`;

    useEffect(() => {
        fetchData();   // fetchData() is called every time value of query changes.
    }, [query]);

    async function fetchData() {
        try {
            const response = await fetch(apiUrl);   // fetch api returns a promise
            const jsonData = await response.json();   // converting json data to json object.
                                                     // json() method also returns a promise.
            setNewsList(jsonData.articles);
        } catch(e) {
            console.log(e, 'error occurred');
        }
    }

	function handleSubmit(event) {
		event.preventDefault();
		const queryValue = queryInputRef.current.value;   // whatever user types and submit, comes in queryValue variable.
		setQuery(queryValue);
	}

	const gridStyle = {
		display: 'grid',
		gridTemplateColumns: 'repeat(3, 30%)',
		justifyContent: 'space-between',
		rowGap: '20px'
	};

    return (
		<div className='news-app'>
			<h1 style={{fontSize: '2.5rem'}}>News Daily</h1>
			<h4>&copy; 2023 Bishnu Mishra. All rights reserved.</h4>
			<form onSubmit={handleSubmit} action="">
				<input className='query-input' type="text" ref={queryInputRef}/>
				<input className='btn-submit' type="submit" value="Search" onClick={handleSubmit}/>
			</form>

			{newsList.length > 0 ? (
				<div style={gridStyle}>
					{newsList.map((news) => {
						return <News key={news.url} news={news} />;
					})}
				</div>
			) : (
				<p>No news articles found.</p>
			)}
		</div>
	);
}

export default NewsApp;