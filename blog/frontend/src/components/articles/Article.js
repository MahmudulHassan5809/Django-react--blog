import React,{Fragment,useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getArticleById } from '../../actions/articleActions';

import Sugar from 'sugar';

import Pagination from './Pagination';

const Article = ({article,getArticleById,match}) => {
    useEffect(() => {
        getArticleById(match.params.article_id);

        // eslint-disable-next-line
    },[])



    return (
        <Fragment>


            <h1 className="my-4">{article.title}</h1>


            <div className="row">

                <div className="col-md-7">
                    <img className="img-fluid" src={article.image} alt="" />
                </div>

                <div className="col-md-5">
                    <h3 className="my-3">Article Description</h3>
                    <p className="text-justify">
                        {article.content}
                    </p>
                    <h3 className="my-3">Article Details</h3>
                    <ul>
                        { article.owner  ? (
                            <Fragment>
                                <li>Wrtiter Name : {article.owner.username}</li>
                                <li>Wrtiter Email : {article.owner.email}</li>
                                <li>Category : { article.category ? article.category.name : ''}</li>
                                <li>Created At : {Sugar.Date.format(new Date(article.created_at), '%Y-%m-%d')}</li>

                            </Fragment>
                        ) : null

                        }

                    </ul>
                </div>

            </div>


        </Fragment>
    )
}

Article.propTypes = {
    article : PropTypes.object.isRequired,
    getArticleById : PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    article : state.article.article,

});

export default connect(mapStateToProps,{getArticleById})(Article);
