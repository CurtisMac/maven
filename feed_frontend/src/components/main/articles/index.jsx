import React from 'react'
import Article from './article'
import { Container, Item, Segment } from 'semantic-ui-react'


function Articles(props) {
    const filteredArticles = props.currentCat === 'All' ? props.articles :
        props.articles.filter((art) => {
            return art.tags.join(' ').toLowerCase().includes(props.currentCat.toLowerCase())
        })

    if (props.sortBy === 'rank') {
        filteredArticles.sort((a, b) => {
            return b.rank - a.rank
        })
    } else if (props.sortBy === 'date') {
        filteredArticles.sort((a, b) => {
            return Date.parse(b.pubDate) - Date.parse(a.pubDate)
        })
    }

    const artList = filteredArticles.map((article, i) => {
        return <Article
            data={article}
            key={i}
        />
    })
    return (
        <Segment basic>
            <Container>
                <Item.Group divided>
                    {artList}
                </Item.Group >
            </Container>
        </Segment>
    )
}

export default Articles