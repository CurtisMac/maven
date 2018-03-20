import React from 'react'
import Article from './article'
import { Container, Item } from 'semantic-ui-react'

function Articles(props) {
    const cards = props.articles.map((article, i) => {
        return <Article
            data={article}
            key={i}
        />
    })
    return (
        <Container>
            <Item.Group divided>
                {cards}
            </Item.Group >
        </Container>
    )
}

export default Articles