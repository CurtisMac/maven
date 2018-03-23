import React from 'react'
import { Item, Label, Icon } from 'semantic-ui-react'
import colors from '../../../assets/palette'
import pretty from 'pretty-date-js'

function Article(props) {
    const a = props.data
    let img = `/images/${Math.floor(Math.random() * 40) + 1  }.jpg`
    const date = pretty(a.pubDate)
    return (
        <Item>
            <Item.Image size='small' src={img} />
            <Item.Content>
                <Item.Header>
                    <a 
                        href={a.url} 
                        target='_blank'>
                        {a.title}
                    </a>
                </Item.Header>
                <Item.Description>
                    {`Published ${date.value} ${date.lang} ${date.misc}`}
                </Item.Description>
                <Item.Meta>
                    <span className='cinema'>{a.summary}</span>
                </Item.Meta>
                <Item.Description>By {a.authors[0]}</Item.Description>
                <Item.Description>Source: {a.src.title}</Item.Description>
                <Item.Extra>
                    <Label
                        color={colors.artLabel}
                        circular={colors.artLabelCircle}
                        > Relevance: {a.rank}
                    </Label>
                    <Label
                        color={colors.artLabel}
                        circular={colors.artLabelCircle}>
                        <Icon name='facebook' />
                        {a.rankData.facebook}
                    </Label>
                    <Label
                        color={colors.artLabel}
                        circular={colors.artLabelCircle}>
                        <Icon name='pinterest' />
                        {a.rankData.pinterest}
                    </Label>
                    <Label
                        color={colors.artLabel}
                        circular={colors.artLabelCircle}>
                        <Icon name='google plus' />
                        {a.rankData.googlePlusOne}
                    </Label>
                    <Label
                        color={colors.artLabel}
                        circular={colors.artLabelCircle}>
                        <Icon name='linkedin' />
                        {a.rankData.linkedIn}
                    </Label>
                    <Label
                        color={colors.artLabel}
                        circular={colors.artLabelCircle}>
                        <Icon name='linkify' />
                        {a.rankData.backlinks}
                    </Label>
                </Item.Extra>
            </Item.Content>
        </Item>
    )
}

export default Article
