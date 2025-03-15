import React from 'react';
import {AirportsDto} from '../../api/rest/airports.dto';
import {CountriesDto} from '../../api/rest/countries.dto';
import {RegionsDto} from '../../api/rest/regions.dto';
import {Heading} from '@radix-ui/themes';
import {FormContainer} from './components/FormContainer/FormContainer';
import {Name} from './components/Name/Name';
import {Country} from './components/Country/Country';
import {Regions} from './components/Regions/Regions';
import {IataCode} from './components/IataCode/IataCode';
import {VaccinationNotes} from './components/VaccinationNotes/VaccinationNotes';
import * as styles from './AddAirportView.styles';

interface AddAirportViewProps {
    airports: AirportsDto;
    countries: CountriesDto;
    regions: RegionsDto;
}

export const AddAirportView: React.FC<AddAirportViewProps> = ({airports, countries, regions}) => {
    return (
        <>
            <Heading as={'h1'} className={styles.mainHeader}>
                Add airport
            </Heading>
            <FormContainer airports={airports}>
                <Name />
                <IataCode />
                <Country countries={countries} />
                <Regions regions={regions} />
                <VaccinationNotes />
            </FormContainer>
        </>
    );
};
