import React from 'react'
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Icon, Image as ImageComponent, Item, Label } from 'semantic-ui-react'
const faker = require('faker')

function Article(props) {
    let a = props.data
    let imgUrl = faker.random.image()
    return (
        <Item>
            <Item.Image size='tiny' src={imgUrl} />
            <Item.Content>
                <Item.Header as='a'><a href={a.url} target='_blank'>{a.title}</a></Item.Header>
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

        // < Card >
        //     <Card.Content>
        //         <Card.Header>
        //             {a.title}
        //         </Card.Header>
        //     </Card.Content>
        //     <Card.Description>
        //         {a.summary}
        //     </Card.Description>
        //     <Card.Content extra>
        //         <Icon name='user' />
        //         {a.rank}
        //     </Card.Content>
        // </Card >