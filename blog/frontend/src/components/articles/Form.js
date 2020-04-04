import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { addArticle } from '../../actions/articleActions';
import { getCategories } from '../../actions/categoryActions';

const Form = ({addArticle,getCategories,categories}) => {

    useEffect(() => {
       getCategories();
        // eslint-disable-next-line
    },[])

    const [article,setArticle] = useState({
        title: '',
        content: '',
        image: null,
        category: '',
    });

    const { title,content,image,category} = article;

    const onChange = (e) => {
        e.preventDefault();
        if (e.target.name == 'image'){

            setArticle({
                ...article,
                [e.target.name] : e.target.files[0]
            });
        }else{
            setArticle({
                ...article,
                [e.target.name] : e.target.value
            });
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();

        let form_data = new FormData();

        if(image){
            form_data.append('image', image, image.name);
        }
        form_data.append('title', title);
        form_data.append('content',content);
        form_data.append('category',category);



        // for(var pair of form_data.entries()) {
        //     console.log(pair[0]+', '+pair[1]);
        // }



        addArticle(form_data)

        setArticle({
            title: '',
            content: '',
            image: null,
        })
    };



    return (
        <div>

            <div className="card card-body mt-4 mb-4">
                <h1>Add Article</h1>
                <form onSubmit={onSubmit}>
                   <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input
                        type="text"
                        name="title"
                        className="form-control"
                        onChange={onChange}
                        value={title}
                        />
                   </div>

                   <div className="form-group">
                        <label htmlFor="content">Content</label>
                        <textarea
                        name="content"
                        value={content}
                        onChange={onChange}
                        className="form-control"
                        cols="30"
                        rows="10">
                        </textarea>

                   </div>

                   <div className="form-group">
                        <label htmlFor="image">Image</label>
                        <input
                        type="file"
                        name="image"
                        accept="image/png, image/jpeg"
                        className="form-control-file"
                        onChange={onChange}
                        />
                   </div>

                   <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <select className="form-control" name="category" onChange={onChange}>
                            {categories.map(cat => (
                                <option value={cat.id} key={cat.id}>{cat.name}</option>
                            ))
                            }



                        </select>
                   </div>

                   <input type="submit" value="Add Article" className="btn btn-primary btn-block"/>

                </form>
            </div>
        </div>
    )
}

Form.propTypes = {
    categories : PropTypes.array.isRequired,
    addArticle : PropTypes.func.isRequired,
    getCategories : PropTypes.func.isRequired
};
const mapStateToProps = state => ({
    categories : state.category.categories,

});

export default connect(mapStateToProps,{addArticle,getCategories})(Form);

