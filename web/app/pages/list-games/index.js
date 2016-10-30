import ATV from 'atvjs';

import template from './template.hbs';


let Page = ATV.Page.create({
	name: 'list-games',
    template: template,
    data: function(response) {
        return response;
    },
    ready(options, resolve, reject) {
        let header = ATV.Settings.get("header");
        console.log("HEADER")
        console.log(header)
        let heheGames = 'http://hehestreams.xyz/api/v1/nba/games';
         ATV
        .Ajax
        .get(heheGames, {headers : header})
        .then((xhr) => {
            let response = xhr.response;
            resolve({
                data: response
            });
        }, (xhr) => {
            let response = xhr.response;
            reject({
                status: xhr.status,
                message: response.message
            });
        });
    },
	events: {
		select: 'onSelect'
	},
	onSelect(e) {
		let element = e.target;
		let uuid = element.getAttribute('data-uuid');
        let title = element.getAttribute('data-title');
		if (uuid) {
			ATV.Navigation.navigate('select-stream', {uuid : uuid});
		}
	}
});

export default Page;