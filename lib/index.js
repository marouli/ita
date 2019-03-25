const axios = require('axios');

class Show {
    constructor(data) {
        this.data = data
    }

    get title() {
        return this.data.title
    }

    get theater() {
        return this.data.theater
    }

    get director() {
        return this.data.director
    }

    get date() {
        return this.data.date
    }

    get time() {
        return this.data.time
    }

    get price() {
        return this.data.price
    }

    get url() {
        return this.data.url
    }

    get image() {
        return this.data.headerImage[0].get('url')
    }

    get language() {
        return this.data.languageSpoken
    }
}

class Service {

    constructor(url, app_id, api_key, default_page_number=5) {
        this.url = url
        this.appId = app_id
        this.apiKey = api_key
        this.pageHits = default_page_number
    }
    
    _getShows() {
        let params = {'x-algolia-agent ': ('Algolia for vanilla JavaScript (lite) 3.30.0;react-instantsearch 5.3.2;JS Helper 2.26.1'),
                            'x-algolia-application-id': this.appId,
                            'x-algolia-api-key': this.apiKey}

        let data = {"requests": [{"indexName": "shows__nl_nl",
                                 "params": ('query=',
                                            '&hitsPerPage=5',
                                            '&page=0',
                                            '&highlightPreTag=%3Cais-highlight-0000000000%3E',
                                            '&highlightPostTag=%3C%2Fais-highlight-0000000000%3E',
                                            '&facets=%5B%5DtagFilters=')}]}

        return axios.post(this.url, data=data, {params: params}).then(response => {
            return response.data.results[0].hits
          })
          .catch(error => {
            console.log(error)
          })
    }

    getAllShows() {
        this._getShows().then(data => {
        let shows = []
        data.map(show => {
            // console.log(show)
            shows.push(new Show(show))
        })
        return shows
        }).catch(error => {
            console.log(error)
          })
    }
}

let service = new Service('https://zz4zqoh5t7-dsn.algolia.net/1/indexes/*/queries', 'ZZ4ZQOH5T7', '978b84b95023d3e445ca1155762547be')
