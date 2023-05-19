package b1.restaurant.restaurant_b1.Service;

import b1.restaurant.restaurant_b1.Entity.Country;
import b1.restaurant.restaurant_b1.Entity.District;
import b1.restaurant.restaurant_b1.Entity.Region;
import b1.restaurant.restaurant_b1.Payload.*;
import b1.restaurant.restaurant_b1.Repository.CountryRepository;
import b1.restaurant.restaurant_b1.Repository.DistrictRepository;
import b1.restaurant.restaurant_b1.Repository.RegionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FilialService {

    private final CountryRepository countryRepository;

    private final RegionRepository regionRepository;

    private final DistrictRepository districtRepository;

    public ApiResponse addCountry(ReqCountry reqCountry) {
        if (!countryRepository.existsCountryByNameEqualsIgnoreCase(reqCountry.getName())) {
            Country country = new Country();
            country.setName(reqCountry.getName());
            countryRepository.save(country);
            return new ApiResponse("davlat saqlandi", true);
        }
        return new ApiResponse("ushbu davlat ma'lumotlar bazasida mavjud", false);
    }

    public List<ResCountry> getCountry() {
        List<ResCountry> resCountries = new ArrayList<>();
        for (Country country : countryRepository.findAll()) {
            ResCountry build = ResCountry.builder()
                    .id(country.getId())
                    .name(country.getName())
                    .build();
            resCountries.add(build);
        }
        return resCountries;
    }

    public ApiResponse editCountry(Integer id, ReqCountry reqCountry) {
        Optional<Country> byId = countryRepository.findById(id);
        if (byId.isPresent()) {
            Country country = byId.get();
            country.setName(reqCountry.getName());
            countryRepository.save(country);
            return new ApiResponse("Davlat taxrirlandi", true);
        }
        return new ApiResponse("Bunday davlat topilamdi", false);
    }

    public ApiResponse deleteCountry(Integer id) {
        Optional<Country> byId = countryRepository.findById(id);
        if (byId.isPresent()) {
            Country country = byId.get();
            countryRepository.delete(country);
            return new ApiResponse("Davlat olib tashlandi", true);
        }
        return new ApiResponse("Bunday davlat topilamdi", false);
    }

    public ApiResponse addRegion(ReqRegion region) {
        Optional<Country> byId = countryRepository.findById(region.getCountryId());
        if (byId.isPresent()) {
            Country country = byId.get();
            if (!regionRepository.existsRegionByNameEqualsIgnoreCase(region.getName())) {
                Region build = Region.builder()
                        .countries(country)
                        .build();
                build.setName(region.getName());
                regionRepository.save(build);
                return new ApiResponse("Viloyat saqlandi", true);
            }
            return new ApiResponse("Ushbu viloyat ma'lumotlar bazasida mavjud", false);
        }
        return new ApiResponse("Siz tanlagan davlat ma'lumotlar bazasida topilmadi", false);
    }

    public List<ResRegion> getRegion() {
        List<ResRegion> resRegions = new ArrayList<>();
        for (Region region : regionRepository.findAll()) {
            ResRegion build = ResRegion.builder()
                    .id(region.getId())
                    .name(region.getName())
                    .country(region.getCountries())
                    .build();
            resRegions.add(build);
        }
        return resRegions;
    }

    public List<ResRegion> getRegionOfOneCountry(Integer id) {
        List<ResRegion> resRegions = new ArrayList<>();
        for (Region region : regionRepository.findRegionByCountries_Id(id)) {
            ResRegion build = ResRegion.builder()
                    .id(region.getId())
                    .name(region.getName())
                    .country(region.getCountries())
                    .build();
            resRegions.add(build);
        }
        return resRegions;
    }

    public ApiResponse editRegion(Integer id, ReqRegion reqRegion) {
        Optional<Region> byId = regionRepository.findById(id);
        if (byId.isPresent()) {
            if (!regionRepository.existsRegionByNameEqualsIgnoreCase(reqRegion.getName())) {
                Region region = byId.get();
                region.setName(reqRegion.getName());
                regionRepository.save(region);
                return new ApiResponse("viloyat taxrirlandi", true);
            }
            return new ApiResponse("bunday viloyat mavjud", false);
        }
        return new ApiResponse("Viloyat ma'lumotlar bazasida topilamdi", false);
    }

    public ApiResponse deleteRegion(Integer id) {
        Optional<Region> byId = regionRepository.findById(id);
        if (byId.isPresent()) {
            Region region = byId.get();
            regionRepository.delete(region);
            return new ApiResponse("viloyat olib tashlandi", true);
        }
        return new ApiResponse("bunday viloyat ma'lumotlar bazasida topilamdi", false);
    }

    public ApiResponse addDistrict(ReqDistrict reqDistrict) {
        Optional<Region> byId = regionRepository.findById(reqDistrict.getRegionId());
        if (byId.isPresent()) {
            Region region = byId.get();
            if (!districtRepository.existsDistrictByNameEqualsIgnoreCase(reqDistrict.getName())) {
                District build = District.builder()
                        .region(region)
                        .build();
                build.setName(reqDistrict.getName());
                districtRepository.save(build);
                return new ApiResponse("tuman saqlandi", true);
            }
            return new ApiResponse("Ushbu tuman ma'lumotlar bazasida mavjud", false);
        }
        return new ApiResponse("Siz tanlagan viloyat ma'lumotlar bazasida topilmadi", false);
    }

    public List<ResDistrict> getDistrict() {
        List<ResDistrict> resDistricts = new ArrayList<>();
        for (District district : districtRepository.findAll()) {
            ResDistrict build = ResDistrict.builder()
                    .id(district.getId())
                    .name(district.getName())
                    .region(district.getRegion())
                    .build();
            resDistricts.add(build);
        }
        return resDistricts;
    }

    public List<ResDistrict> getDistrictOfOneRegion(Integer id) {
        List<ResDistrict> resDistricts = new ArrayList<>();
        Optional<Region> byId = regionRepository.findById(id);
        if (byId.isPresent()) {
            for (District district : districtRepository.findDistrictsByRegion_Id(id)) {
                ResDistrict build = ResDistrict.builder()
                        .id(district.getId())
                        .name(district.getName())
                        .region(district.getRegion())
                        .build();
                resDistricts.add(build);
            }
            return resDistricts;
        }
        return null;
    }

    public ApiResponse editDistrict(Integer id, ReqDistrict reqDistrict) {
        Optional<District> byId = districtRepository.findById(id);
        if (byId.isPresent()) {
            District district = byId.get();
            if (!districtRepository.existsDistrictByNameEqualsIgnoreCase(reqDistrict.getName())) {
                district.setName(reqDistrict.getName());
                districtRepository.save(district);
                return new ApiResponse("tuman nomi taxrirlandi", true);
            }
            return new ApiResponse("bunday tuman ma'lumotlar bazasida mavjud", false);
        }
        return new ApiResponse("Siz tanlagan tuman topilamdi", false);
    }

    public ApiResponse deleteDistrict(Integer id) {
        Optional<District> byId = districtRepository.findById(id);
        if (byId.isPresent()) {
            District district = byId.get();
            districtRepository.delete(district);
            return new ApiResponse("Tuman olib tashlandi", true);
        }
        return new ApiResponse("Bunday tuman ma'lumotlar bazasida topilamdi", false);
    }
}
