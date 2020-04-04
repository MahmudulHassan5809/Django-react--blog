import React,{useEffect} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { myPosts } from '../../actions/authActions';
import { deleteArticle } from '../../actions/articleActions';

import Sugar from 'sugar';

const Dashboard = ({articles,myPosts,isAuthenticated,deleteArticle}) => {
    useEffect(() => {
        if(isAuthenticated){
            myPosts();
        }
        // eslint-disable-next-line
    },[articles]);

    const articleDelete = (e) => {
        const articleId = event.target.dataset.articleid;
        if(isAuthenticated){
            deleteArticle(articleId);
        }

    }

    return (
        <div>
            <table className="table table-hover table-inverse">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Created At</th>
                        <th>View</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {articles.map(article => (
                        <tr key={article.id}>
                            <td>{article.title}</td>
                            <td>
                                <img src={article.image} alt="" width="80px"/>
                            </td>
                            <td>{article.category ? article.category.name : ''}</td>
                            <td>
                                <Link className="btn btn-link" to={'/read/more/'+article.title + '/' +article.id }>
                                                Read More
                                            </Link>
                            </td>
                            <td>{Sugar.Date.format(new Date(article.created_at), '%Y-%m-%d')}</td>
                            <td>
                                <button data-articleid={article.id} onClick={articleDelete} type="button" className="btn btn-danger">Danger</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
        </div>
    )
}

Dashboard.propTypes = {
    articles : PropTypes.array.isRequired,
    myPosts : PropTypes.func.isRequired,
    deleteArticle : PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};
const mapStateToProps = state => ({
    articles : state.auth.myPosts,
    isAuthenticated : state.auth.isAuthenticated
});

export default connect(mapStateToProps,{myPosts,deleteArticle})(Dashboard);

