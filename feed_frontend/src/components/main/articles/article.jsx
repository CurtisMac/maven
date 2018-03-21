import React from 'react'
import { Item, Label } from 'semantic-ui-react'

function Article(props) {
    const a = props.data
    let img = `/images/${Math.floor(Math.random() * 40) + 1  }.jpg`

    return (
        <Item>
            <Item.Image size='small' src={img} />
            <Item.Content>
                <Item.Header><a href={a.url} target='_blank'>{a.title}</a></Item.Header>
                <Item.Meta>
                    <span className='cinema'>{a.summary}4</span>
                </Item.Meta>
                <Item.Description>{a.authors[0]}</Item.Description>
                <Item.Extra>
                    <Label>{a.rank}</Label>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default Article
