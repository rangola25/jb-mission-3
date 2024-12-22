"use strict";

(() => {

    const getData = (url) => {
        return fetch(url).then(response => response.json())
    }

    const generateSpecificCountryTotalCountriesAndPopulation = countries => {
        const totalCountries  = countries.length
        const totalPopulation = countries
        .map(country => country.population) 
        .reduce((accum, current) => accum + current, 0);
        const averagePopulation = totalCountries > 0 ? totalPopulation / totalCountries : 0; 
                return `
                   <li>Total countries result: ${totalCountries}</li>
                   <li>Total Countries Population: ${totalPopulation}</li>
                   <li>Average Population: ${averagePopulation}</li>
                `
    }

    const generateSpecificCountryWhichCountryAndNumberOfCitizens = countries => {
        const newHTML = countries
            .map(country => {
                const countryName = country.name.common;
                const numberOfCitizens = country.population;
                return `
                    <tr>
                        <td>${countryName}</td>
                        <td>${numberOfCitizens}</td>
                    </tr>
                `;
            })
            .join('');  
        return newHTML;
    };

    const generateSpecificCountryWhichMainland = data => {
        const totalRegions = data
            .map(data => data.region)
            .reduce((region, current) => {
                const existingRegion = region.find(theCountryRegion => theCountryRegion.region === current)
                if(!existingRegion) region.push({
                    region: current,
                    count: 1
            })
            else existingRegion.count++
            return region
        }, [])
                const newHTML = totalRegions
                .map(regionData => {
                    return `
                        <tr>
                            <td>${regionData.region}</td>
                            <td>${regionData.count}</td>
                        </tr>
                    `;
                })
                .join('');
                 return newHTML;
    };
    
    const generateCoins = data => {
        const totalCurrencies = data
            .map(country => Object.keys(country.currencies))
            .flat()
            .reduce((currencies, currencyCode) => {
                const existingCurrency = currencies.find(currency => currency.currencyCode === currencyCode);
                
                if (!existingCurrency) {
                    currencies.push({
                        currencyCode: currencyCode,
                        count: 1
                    });
                } else {
                    existingCurrency.count++;
                }
                
                return currencies;
            }, []);
    
        const newHTML = totalCurrencies
            .map(currencyData => {
                return `
                    <tr>
                        <td>${currencyData.currencyCode}</td>
                        <td>${currencyData.count}</td>
                    </tr>
                `;
            })
            .join('');
    
        return newHTML; 
    };

    const generateStatsHTML = countries => {
        const totalCountries  = countries.length
        const totalPopulation = countries
        .map(country => country.population) 
        .reduce((accum, current) => accum + current, 0);
        const averagePopulation = totalCountries > 0 ? totalPopulation / totalCountries : 0; 
                return `
                   <li>Total countries result: ${totalCountries}</li>
                   <li>Total Countries Population: ${totalPopulation}</li>
                   <li>Average Population: ${averagePopulation}</li>
                `
    }
    

    const generateHTML = countries => {
        const newHTML = countries
            .reduce((cumulative, country, index) => {
                const { name } = country
                return cumulative + `
                    <tr>
                        <td>${index + 1}</td>
                        <td>${name.common}</td>
                    </tr>
                `
            }, '')
        return newHTML
    }
    

    const renderSpecificCountryTotalCountriesAndPopulation = newHTML => document.getElementById('basicStats').innerHTML = newHTML

    const renderSpecificCountryWhichCountryAndNumberOfCitizens = newHTML => document.getElementById('numberOfCitizens').innerHTML = newHTML

    const renderSpecificCountryWhichMainland = newHTML => document.getElementById('region').innerHTML = newHTML

    const renderCoins = newHTML => document.getElementById('currencies').innerHTML = newHTML

    const renderStatsHTML = newHTML => document.getElementById('basicStatsAll').innerHTML = newHTML

    const renderHTML = newHTML => document.getElementById('allCountries').innerHTML = newHTML

    document.getElementById('buttonSearch').addEventListener('click', async (event) => {
        event.preventDefault()
        const name = document.getElementById('inputSearch').value
        const country = await getData(`https://restcountries.com/v3.1/name/${name}`)
        const totalCountriesAndPopulation = generateSpecificCountryTotalCountriesAndPopulation(country)
        renderSpecificCountryTotalCountriesAndPopulation(totalCountriesAndPopulation)

        const whichCountryAndNumberOfCitizens = generateSpecificCountryWhichCountryAndNumberOfCitizens(country)
        renderSpecificCountryWhichCountryAndNumberOfCitizens(whichCountryAndNumberOfCitizens)

        const whichMainland = generateSpecificCountryWhichMainland(country)
        renderSpecificCountryWhichMainland(whichMainland)

        const coins = generateCoins(country)
        renderCoins(coins)
    })

    document.getElementById('buttonAll').addEventListener('click', async (event) => {
        event.preventDefault()

        try {

            const users = await getData('https://restcountries.com/v3.1/all')

            const newHTML = generateHTML(users)
            const newStatsHTML = generateStatsHTML(users)

            renderHTML(newHTML)
            renderStatsHTML(newStatsHTML)
            
        } catch (e) {
            console.warn(e)
        }
    })

})()


