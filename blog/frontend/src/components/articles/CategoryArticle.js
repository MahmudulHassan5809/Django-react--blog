import React,{Fragment,useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getArticles } from '../../actions/articleActions';
import { getCategories,getArticlesByCategory } from '../../actions/categoryActions';

import Sugar from 'sugar';



const CategoryArticle = ({articles,getCategories,categories,getArticlesByCategory,match,history}) => {

    useEffect(() => {

        getCategories();
        getArticlesByCategory(match.params.category_id);

        // eslint-disable-next-line
    },[match.params])



return (
        <Fragment>

            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center text-dark">All Articles By {match.params.category_name}</h2>
                </div>
            </div>
            <hr/>

            <div className="row">

                    <div className="col-md-3">
                        <ul className="list-group">
                            <li className="list-group-item">All Categories</li>
                            {categories.map(category => (
                                <li key={category.id} className="list-group-item">
                                    <Link
                                    className="btn btn-link"
                                    to={'/category/articles/'+category.name + '/' +category.id + '/' }>
                                                {category.name}
                                            </Link>
                                </li>

                            ))}

                        </ul>
                    </div>

                    <div className="col-md-9">
                        <div className="row">
                            { articles.map(article => (
                                <div className="col-md-4" key={article.id}>
                                    <div className="card border-primary mb-3" style={{maxWidth: "20rem"}}>
                                        <div className="card-header">{article.title}</div>
                                        <img className="card-img-top" src={article.image} alt="Card image cap" />
                                        <div className="card-body">
                                            <h4 className="card-title">{article.title}</h4>
                                            <p className="card-text">{Sugar.String.truncate(article.content, 200)}</p>
                                            <p className="card-text">Writer : {article.owner ? article.owner.username : ''}</p>
                                            <p className="card-text">Created At : {Sugar.Date.format(new Date(article.created_at), '%Y-%m-%d')}</p>

                                            {
                                                article.owner ? (
                                                    <Link className="btn btn-link" to={'/user/articles/'+article.owner.id + '/' +article.owner.username }>
                                                        View More Of This Writer
                                                    </Link>
                                                ) : null
                                            }

                                            <Link className="btn btn-link" to={'/read/more/'+article.title + '/' +article.id }>
                                                Read More
                                            </Link>

                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

            </div>

        </Fragment>
    )
}

CategoryArticle.propTypes = {
    articles : PropTypes.array.isRequired,
    categories : PropTypes.array.isRequired,

    getCategories : PropTypes.func.isRequired,
    getArticlesByCategory : PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    articles : state.article.articles,
    categories : state.category.categories,
});

export default connect(mapStateToProps,{getArticlesByCategory,getCategories})(CategoryArticle);
