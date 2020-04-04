import React,{Fragment} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getArticles } from '../../actions/articleActions';

const Pagination = ({pagination,getArticles}) => {
    let next_page,prev_page;

    if(pagination.next){
        next_page = pagination.next.slice(-1);
    }
    if(pagination.prev){
        prev_page = pagination.prev.slice(-1);
        if (prev_page === '/') {
            prev_page = 1
        }
    }

    const getPosts = (event) => {
        const page_number = event.target.dataset.page;
        getArticles(page_number);
    }

    return (
    <Fragment>

        <div className="col-md-6">
        {
            pagination.next ? (
                <button data-page={next_page} onClick={getPosts} className="btn btn-block btn-primary btn-lg">Next &raquo;</button>
            ) : ''
        }
        </div>

        <div className="col-md-6">
            {
                pagination.prev ? (
                    <button data-page={prev_page} onClick={getPosts} className="btn btn-block btn-primary btn-lg">Prev &raquo;</button>
                ) : ''
            }
        </div>
    </Fragment>
    )
}

Pagination.propTypes = {
    pagination : PropTypes.object,
    getArticles : PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    pagination : state.article.pagination
});

export default connect(mapStateToProps,{getArticles})(Pagination);
