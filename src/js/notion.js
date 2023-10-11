import { Client } from '@notionhq/client'

const DATABASE_ID = "888b9190ca0b410a89838294b3e596fb"

const notion = new Client({
    auth: import.meta.env.NOTION_TOKEN
})

export const getArticles = async ({ filterBy } = {}) => {
    const query = {database_id: DATABASE_ID}

    if (filterBy) {
        query.filter = {
            property: 'slug',
            rich_text: {
                equals: filterBy
            }
        }
    }

    const { results } = await notion.databases.query(query)

    return results.map(page => {
        const {properties} = page
        const {slug, title, img} = properties

        return {
            id: slug.rich_text[0].plain_text,
            img: img.rich_text[0].plain_text,
            title: title.title[0].plain_text
        }
    })
}