import React from 'react'
import { getAcoes } from '~/lib/backend'
import PageWrapper from '~/components/struct/PageWrapper'
import ContentWrapper from '~/components/struct/ContentWrapper'
import Title from '~/components/Title'
import CategorySelector from '~/components/CategorySelector'
import ImageGrid from '~/components/ImageGrid'
import Link from '~/components/MenuLink'

export default class pageAcoes extends React.Component {
  static async getInitialProps ({ req, query }) {
    const { documents, categories } = await getAcoes()
    const { initialCategory } = query
    return { documents, categories, initialCategory }
  }

  state = {
    selectedCategory: false
  }

  render () {
    const { documents, categories, initialCategory } = this.props
    const { selectedCategory } = this.state
    return (
      <PageWrapper title='Ações & imaginações' style={{ background: '#DFDFDF' }}>
        <ContentWrapper>
          <div className='filterLine'>
            <Title>/Ações & imaginações:</Title>
            <Link href={{ pathname: '/acoes/tags' }}>Palavras-chave;</Link>
          </div>
          <div  className='filterLine' style={{marginBottom: 50}}>
            <CategorySelector
              categories={categories}
              selected={selectedCategory || initialCategory}
              onClick={this.handleCategorySelection}
            />
            <Link href={{ pathname: '/acoes/authors' }}>Participantes;</Link>
          </div>
          <ImageGrid items={documents} category={selectedCategory || initialCategory} />
        </ContentWrapper>
        <style jsx>{`
          .filterLine {
            justify-content: space-between;
            font-family: 'Source Serif Pro', serif;
            font-weight: 600;
            align-items: flex-start;
            font-size: 29px;
          }
          @media only screen and (min-width: 752px) {
            .filterLine {
              font-size: 41px;
              display: flex;
            }
          }
        `}</style>
      </PageWrapper>
    )
  }

  handleCategorySelection = (category) => {
    this.setState({ selectedCategory: category })
  }
}
