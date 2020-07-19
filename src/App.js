import React from 'react';
import { Table } from 'antd';
import './App.css';
const columns = [
  {
    title: 'Repository name',
    dataIndex: 'name',
    key: 'key',


  },
  {
    title: 'Repository full name',
    dataIndex: 'fullName',
    key: 'key',
  },
  {
    title: 'Repository URL',
    dataIndex: 'url',
    key: 'key',
    render: title => <a href={title} target="_blank" rel="noopener noreferrer" >{title}</a>,
  }
]




class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      repos: [],
      loading: false,
      pagination: {
        defaultCurrent: 1,
        pageSize: 5,
      },
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    fetch('https://api.github.com/orgs/churchdesk/repos?per_page=10&page=1')
      .then(response => response.json())
      .then(data => {
        this.setState({
          loading: false,
          repos: data.map((repo, index) => {
            return {
              name: repo.name,
              fullName: repo.full_name,
              url: repo.url,
              key: repo.id
            }
          })
        })
      })
  }




  render() {
    return (
      <div className="App">
        <Table
          columns={columns}
          dataSource={this.state.repos}
          pagination={this.state.pagination}
          loading={this.state.loading}
        />
      </div>
    )

  }
}



export default App;