import React from 'react'
import Prismic from 'prismic-javascript'
import LogoWithMenu from '~/components/LogoWithMenu'
import ContentWrapper from '~/components/struct/ContentWrapper'
import PageWrapper from '~/components/struct/PageWrapper'
import Title from '~/components/Title'
import Paragraph from '~/components/base/Paragraph'
import Img from '~/components/base/Image'

const P = ({children}) => <Paragraph style={{maxWidth: 710}}>{children}</Paragraph>

export default class Oquee extends React.Component {
  static async getInitialProps ({ req }) {
    const api = await Prismic.api('https://fora.prismic.io/api/v2')
    const homeDocument = await api.getSingle('home')
    const title = homeDocument.data.title[0].text
    return { title }
  }

  render () {
    return (
      <PageWrapper invert title="Fora" description="O Fora é sobre possibilidades de viver a cidade e acontece por meio de pesquisas sociais, manifestações culturais e ações na paisagem urbana." cover='https://fora.cdn.prismic.io/fora/21c85cdcacb048a984d1150c855296cbda4b1095_fora-dobra-do-corpo-1-.jpg'>
        <div className='cover'>
          <ContentWrapper style={pageStyle}>
            <Title>/O que é</Title>
            <span>O Fora é sobre possibilidades de viver a cidade e acontece por meio de pesquisas sociais, manifestações culturais e ações na paisagem urbana.</span>
          </ContentWrapper>
        </div>
        <div className='content' style={{background: '#dfdfdf'}}>
          <ContentWrapper style={pageStyle}>
            <P><div className='title' id="about">
              /Sobre
            </div></P>
            <div className='heading'>
              <P><span>
                Para levantar histórias, urgências e possíveis futuros dos centros urbanos, o Fora parte da escuta da população e da análise de dados para trazer à tona pontos de vista, impressões e demandas ligadas ao espaço público de São Paulo.
              </span></P>
              <P><span>
                Em diálogo com essas pesquisas, o Fora impulsiona práticas artísticas, atividades educativas e ações materiais que repensam as paisagens de diferentes áreas da cidade.
              </span></P>
              <P><span>
                Atuando como canal de cultura e comunicação nas ruas e na internet, o Fora estimula uma diversidade de narrativas para imaginar e refletir sobre o que nos é comum.
              </span></P>
              <P><span>
                Diante dos esgotamentos atuais, é no Fora que nos encontramos para conhecer e exercer diferentes formas de vida.
              </span></P>
            </div>
            <div style={{textAlign: 'center', marginTop: 25}}>
              <Img src='/static/oquee.gif' />
            </div>
            <P><div className='title' id='research'>
              /Pesquisas
            </div></P>
            <P><span>
              Para propor reflexões públicas e nortear as ações do Fora a área de pesquisa social atua por meios digitais e trabalhos de campo, colhendo dados e realizando escutas de diferentes vivências, visões e vozes na cidade de São Paulo. Investiga possibilidades de vida no espaço público e o que se perde na ausência desses locais, refletindo sobre formas viáveis de criar, manter e viver a rua.
            </span></P>
            <P><div className='title' id='cultures'>
              /Culturas
            </div></P>
            <P><span>
              Como canal de comunicação e cultura o Fora reúne um grupo diverso e multidisciplinar para promover encontros e provocar imaginações sobre nossos corpos, a cidade e a vida comum. Por meio da produção e difusão de conteúdo na esfera digital e com programas de arte e educação nas ruas, aborda assuntos de interesse global e perspectivas locais, fazendo circular afetos e maneiras de viver espaços públicos.
            </span></P>
            <P><div className='title' id='landscapes'>/Paisagens</div></P>
            <P><span>
              Para atuar na paisagem urbana o Fora investiga o que se pode ver, ouvir, cheirar, provar e tocar na cidade, promovendo práticas paisagísticas com pequenas infraestruturas, mobiliários, vestuários e composições botânicas. Partindo da pesquisa social e das experiências artísticas e educativas, também desenvolve projetos para conceber e manter espaços comuns ao ar livre.
            </span></P>
          </ContentWrapper>
        </div>
        <div className='info' id='info'>
          <ContentWrapper style={{ ...pageStyle, background: '#cfcfcf', position: 'relative'}}>
            <span className='float-title'>/Informações gerais</span>

            <P><div className='title'>/Equipe</div></P>
            <P><div className='subtitle'>_Pesquisa social e análise de dados</div></P>
            <P><div className='grid'>
              <div><b>Fabricia Ramos</b><br />Pesquisadora social e advogada, é coordenadora da área de pesquisa social e qualitativa do Fora.</div>
              <div><b>Fernanda Moraes</b><br />Jornalista livre e graduanda em Gestão de Políticas Públicas, é pesquisadora do Fora.</div>
              <div><b>Glória Maria</b><br />Jornalista livre e produtora cultural, é pesquisadora do Fora.</div>
              <div><b>João Meirelles</b><br />Engenheiro e cientista de dados, é coordenador da área de coleta de dados quantitativos no Fora.</div>
            </div></P>
            <P><div className='grid'>
              <div><b>Karol Oliveira</b><br />Produtora cultural e educadora popular, é pesquisadora do Fora.</div>
              <div></div>
              <div></div>
              <div></div>
            </div></P>
            <P><div className='subtitle'>_Cultura e comunicação</div></P>
            <P><div className='grid'>
              <div><b>Germano Dushá</b><br />Escritor, curador e produtor cultural, é co-idealizador do Fora e trabalha com a orientação da equipe do projeto e articulação geral da área de Cultura e comunicação.</div>
              <div><b>Gilberto Vieira</b><br />Comunicador e pesquisador sobre culturas e territórios, articula estratégias, tecnologia e ferramentas de comunicação.</div>
              <div><b>Johanna Stein</b><br />Pesquisadora em artes visuais, é co-idealizadora do Fora e atua no posicionamento público e assessoria na área de Cultura e comunicação do Fora.</div>
              <div><b>Manuela Rached</b><br />Jornalista, é responsável pela articulação interna e assessoria na área de Cultura e comunicação do Fora.</div>
            </div></P>
            <P><div className='grid'>
              <div><b>Ramon Brandão</b><br />Cientista Social, professor e pesquisador na área de ética e filosofia política, é responsável pela fundamentação conceitual e coordena a área de Ensaios do Fora.</div>
              <div><b>Raphael Escobar</b><br />Artista visual e educador social, no Fora trabalha com inserções em territórios e atividades locais.</div>
              <div><b>Veronica Deviá</b><br />Jornalista, cientista política e pesquisadora na área de gênero, no Fora coordena a área de Jornalismo.</div>
              <div></div>
            </div></P>
            <P><div className='subtitle'>_Paisagem</div></P>
            <P><div className='grid'>
              <div><b>Guil Blanche</b><br />Paisagista com foco na reabilitação de paisagens urbanas, é co-idealizador do Fora e trabalha com a condução executiva do projeto e articulação geral da área de paisagem.</div>
              <div></div>
              <div></div>
              <div></div>
            </div></P>
            <P><div className='subtitle'>_Gestão</div></P>
            <P><div className='grid'>
              <div><b>Leticia Rheingantz</b><br />Cineasta e produtora, é co-responsável pela gestão e desenvolvimento da linha do tempo do Fora.</div>
              <div><b>Inez Lisboa</b><br />Economista e especialista em finanças, é responsável pelos processos administrativos e financeiros do Fora.</div>
              <div></div>
              <div></div>
            </div></P>
            <P><div className='subtitle'>_Design gráfico</div></P>
            <P><div className='grid'>
              <div><b>Frederico Dietzsch</b><br />Designer gráfico, criador da identidade visual e responsável pelos projetos gráficos do Fora.</div>
              <div><b>Raul Luna</b><br />Diretor de arte, é responsável pelo desenho do site e pelos projetos gráficos do Fora.</div>
              <div></div>
              <div></div>
            </div></P>
            <P><div className='subtitle'>_Programação</div></P>
            <P><div className='grid'>
              <div><b>Diogo Vianna</b><br />Programador, é responsável pelo desenvolvimento do site do Fora.</div>
              <div></div>
              <div></div>
              <div></div>
            </div></P>

            <P><div className='title'>/Colaboradores</div></P>
            <P><div className='subtitle'>_Pesquisa social e análise de dados</div></P>
            <P><div className='grid'>
              <div><b>Marcela Amorozo</b><br />Geógrafa e educadora, é pesquisadora na área de levantamento e processamento de dados quantitativos do Fora.</div>
              <div></div>
              <div></div>
            </div></P>
            <P><div className='subtitle'>_Assessoria de projeto</div></P>
            <P><div className='grid'>
              <div><b>AeF Soluções em Gestão</b><br /></div>
              <div></div>
              <div></div>
              <div></div>
            </div></P>
            <P><div className='subtitle'>_Assessoria jurídica</div></P>
            <P><div className='grid'>
              <div><b>Tilkian Marinelli Marrey Advogados</b><br /></div>
              <div></div>
              <div></div>
              <div></div>
            </div></P>
            <P><div className='subtitle'>_Assessoria de imprensa</div></P>
            <P><div className='grid'>
              <div><b>Index</b><br /></div>
              <div></div>
              <div></div>
              <div></div>
            </div></P>

            <P><div className='title'>/Financiamento</div></P>
            <P><div className='grid'>
              <div><b>Autofinanciado.</b></div>
              <div></div>
              <div></div>
              <div></div>
            </div></P>
          </ContentWrapper>

        </div>
        <style jsx>{`
          .cover {
            height: 60vh;
            background: url('/static/oqueebg.jpg');
            background-size: cover;
            background-position: center bottom;
            color: white;
            font-family: 'Source Serif Pro', serif;
            position: relative;
          }
          .cover span {
            position: absolute;
            font-size: 21px;
            bottom: 20px;
            left: 20px;
            right: 60px;
            max-width: 750px;
          }
          .title {
            font-size: 24px;
            margin: 1.5em 0 1em 30px;
            font-family: 'Source Serif Pro', serif;
          }
          .subtitle {
            margin-left: 30px;
            margin-top: 1.5em
          }
          .content {
            font-family: 'Source Serif Pro', serif;
          }
          .content span {
            font-size: 21px;
          }
          .content .heading span {
            font-size: 21px;
            padding-bottom: 0.45em;
            display: block;
            font-weight: 600;
          }
          .info {
            font-family: 'Source Sans Pro', sans-serif;
          }
          .info .float-title {
            font-size: 24px;
            /* max-width: 180px; */
            /* position: absolute; */
            margin-bottom: -10px;
            display: block;
            font-family: IntervalBook, monospace;
            font-size: 16px;
          }
          .info .grid > div {
            margin-bottom: 1em;
          }
          @media only screen and (min-width: 752px) {
            .cover {
              height: 100vh;
            }
            .cover span {
              font-size: 41px;
              bottom: 17%;
            }
            .content span {
              font-size: 24px;
            }
            .content .heading span {
              font-size: 29px;
              font-weight: normal;
            }
            .info .float-title {
              margin-left: 60px;
            }
            .info .grid {
              display: flex;
              justify-content: space-between;
            }
            .info .grid > div {
              width: 22%;
              margin-bottom: 0;
            }
          }
        `}</style>
      </PageWrapper>
    )
  }
}

const pageStyle = {
  paddingBottom: 40
}
