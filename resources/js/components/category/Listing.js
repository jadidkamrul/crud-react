import React, { Component } from 'react';
import axios from 'axios';

export default class Listing extends Component {

    constructor()
    {
        super();
        this.state = {
            categories:[]
        }
    }

    componentDidMount(){
        axios.get('http://127.0.0.1:8000/category')
        .then(response=>{
            this.setState({categories:response.data})
        });
    }

    onDelete(category_id)
    {
        axios.delete('http://127.0.0.1:8000/category/delete/'+ category_id)
        .then(response=>{
            var cataegories = this.state.categories;
            for(var i =0; i<categories.length; i++)
            {
                if(categories[i].id == category_id){
                    categories.splice(i,1);
                    this.setState({categories:cataegories});
                }
            }
        });

    }

    render(){
        return (
           <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="row">1</th>
                            <th>Category Name</th>
                            <th>Status</th>
                            <th>Create At</th>
                            <th>Updated At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.categories.map(category=>{
                                return(
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>{category.name}</td>
                                        <td>{category.active == 1?("Activate"):("InActive")}</td>
                                        <td>{category.created_at}</td>
                                        <td>{category.updated_at}</td>
                                        <td><a href="#" onClick={this.onDelete.bind(this,category.id)}> Deleted</a></td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
           </div>
        );
    }
}

