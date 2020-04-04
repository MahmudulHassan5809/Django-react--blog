import React,{Fragment,useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';


import Sugar from 'sugar';

import { connect } from 'react-redux';
import { getUserArticles } from '../../actions/articleActions';

const Articles = ({articles,getUserArticles,match}) => {
    useEffect(() => {
        getUserArticles(match.params.user_id);
        // eslint-disable-next-line
    },[])




    return (
        <Fragment>

            <div className="row">
                <div className="col-md-12">
                    <h2 className="text-center text-dark">All Articles By {match.params.username}</h2>
                </div>
            </div>
            <hr/>
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

                                 <Link className="btn btn-link" to={'/read/more/'+article.title + '/' +article.id }>
                                    Read More
                                </Link>


                            </div>
                        </div>
                    </div>
                ))}
            </div>

        </Fragment>
    )
}

Articles.propTypes = {
    articles : PropTypes.array.isRequired,
    getUserArticles : PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    articles : state.article.articles
});

export default connect(mapStateToProps,{getUserArticles})(Articles);
