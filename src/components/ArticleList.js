import ArticlePreview from './ArticlePreview';
import ListPagination from './ListPagination';
import React from 'react';
import TableData from './Table';

const ArticleList = props => {
  let articleData = [];
  if (!props.articles) {
    return (
      <div className="article-preview">Loading...</div>
    );
  }

  if (props.articles.length === 0) {
    return (
      <div className="article-preview">
        No results are here... yet.
      </div>
    );
  }

  if(props.articles.length > 0){
    // articleData = props.articles.sort((a, b) => new Date(b.date) - new Date(a.date)) ;
    //articleData = props.articles.filter(a => a.tradeType !== "Sell").filter(a => a.globalHasRiskInsight > 0 && a.isNewIteration).sort((a, b) => new Date(b.date) - new Date(a.date)) ;
    //articleData = props.articles.filter(a => a.isNewIteration).filter(a => a.tradeType != "Sell").filter(a => parseInt(a.globalEbidt)> 0).sort((a, b) => new Date(b.date) - new Date(a.date)) ;
    articleData = props.articles.filter(a => a.tradeType !== "Sell");

    articleData = articleData.map((e) =>  {
      e['date'] = new Date(e.date).toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      }).replace(/ /g, '-');
      e['tradeType'] =  e.tradeType ? e.tradeType : 'Buy';
      return e;
    });
  }



  return (

    <div>
      <TableData
        articles={articleData}
      />
    </div>
    // <div>
    //   {
    //     props.articles.map(article => {
    //       return (
    //         <ArticlePreview article={article} key={article.slug} />
    //       );
    //     })
    //   }

    //   <ListPagination
    //     pager={props.pager}
    //     articlesCount={props.articlesCount}
    //     currentPage={props.currentPage} />
    // </div>
  );
};

export default ArticleList;
