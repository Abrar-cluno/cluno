const FileBasedOffersDAO = require('../data-access/fs-offers-dao');

const availableOffers = require('./__fixtures__/offers');

describe('test suite for offer data-access-object', () => {
  it('should be able to filter offer with make, price and portfolio', async () => {
    const offersDAO = new FileBasedOffersDAO({
      offers: availableOffers
    });

    const retrievedOffers = offersDAO.query({
      params: {
        make: 'Nissan',
        portfolio: '0001',
        price: {
          min: 349,
          max: 349
        }
      }
    });

    expect(retrievedOffers).toHaveLength(1);
    expect(retrievedOffers).toContainEqual({
      portfolio: '0001',
      conditions: { minimumAge: 23, maximumAge: 73, minLicenseDuration: 3 },
      visible: false,
      car: {
        equipmentDetails: [
          { name: 'Alufelgen' },
          { name: 'Bluetooth' },
          { name: 'Klimaautomatik' },
          { name: 'Navi' },
          { name: 'Sitzheizung' },
          { name: 'Sound System' },
          { name: 'Tempomat' }
        ],
        fueltype: 'Benzin',
        ps: 116,
        offerExtColor: 'Schwarz',
        gearingType: 'Schaltgetriebe',
        ccm: '1.2',
        kw: 85,
        version: 'Acenta',
        doors: '5',
        environment: {
          emissionLabel: 'B',
          emissionClass: 'Euro 6',
          consumptionCity: 6.3,
          emissionCO2: 117,
          consumptionCombined: 5,
          consumptionCountry: 4.3
        },
        model: 'Pulsar',
        drive: 'Vorderradantrieb',
        make: 'Nissan'
      },
      available: false,
      detailUrl: '/de/portfolio/nissan-pulsar-acenta-120/',
      teaser: {
        title: 'Nissan Pulsar',
        teaserImage: 'https://assets.cluno.com/2017/11/120-1.png',
        equipmentHighlights: [{ name: 'Navi' }, { name: 'Sitzheizung' }, { name: 'Tempomat' }]
      },
      labels: [],
      segment: '2B',
      images: [
        {
          width: 665,
          title: 'Nissan Pulsar',
          src: 'https://assets.cluno.com/2017/11/120-1.png',
          height: 304
        }
      ],
      id: '120',
      pricing: {
        startingFee: 299,
        deliveryFee: 0,
        monthlyExcessKilometers: 500,
        excessKilometers: 0.2,
        unusedKilometers: 0,
        deductiblePartialCover: 500,
        price: 349,
        bookableOptions: [
          { name: 'Wunschfarbe Wei�', price: 0, selected: false },
          { name: 'Automatik', price: 30, selected: false }
        ],
        deductibleFullyComprehensive: 1000,
        includedAnnualKilometers: 15000
      }
    });
  });

  it('offers should be sorted asc by price', () => {
    const offersDAO = new FileBasedOffersDAO({
      offers: availableOffers
    });

    const retrievedOffers = offersDAO.query({
      price: {
        min: '10',
        max: '1000000'
      }
    });

    const areOffersSortedAsc = retrievedOffers.every(
      (offer, index, allOffers) =>
        !index || offer.pricing.price >= allOffers[index - 1].pricing.price
    );

    expect(areOffersSortedAsc).toBe(true);
  });
});
