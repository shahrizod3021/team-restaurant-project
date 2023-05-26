package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Entity.Country;
import b1.restaurant.restaurant_b1.Entity.District;
import b1.restaurant.restaurant_b1.Entity.Region;
import b1.restaurant.restaurant_b1.Payload.*;
import b1.restaurant.restaurant_b1.Repository.CountryRepository;
import b1.restaurant.restaurant_b1.Repository.DistrictRepository;
import b1.restaurant.restaurant_b1.Repository.RegionRepository;
import b1.restaurant.restaurant_b1.Service.FilialService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/filial")
@RequiredArgsConstructor
@CrossOrigin
public class FilialController {

    private final FilialService filialService;

    public final CountryRepository countryRepository;
    private final RegionRepository regionRepository;
    private final DistrictRepository districtRepository;

    @PostMapping
    public HttpEntity<?> addCountry(@RequestBody ReqCountry reqCountry) {
        ApiResponse apiResponse = filialService.addCountry(reqCountry);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/list")
    public HttpEntity<?> getCountry() {
        List<ResCountry> country = filialService.getCountry();
        return ResponseEntity.ok(country);
    }

    @PutMapping("/{id}")
    public HttpEntity<?> editCountry(@PathVariable Integer id, @RequestBody ReqCountry reqCountry) {
        ApiResponse apiResponse = filialService.editCountry(id, reqCountry);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @DeleteMapping("/{id}")
    public HttpEntity<?> deleteCountry(@PathVariable Integer id) {
        ApiResponse apiResponse = filialService.deleteCountry(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }


    @PostMapping("/addRegion")
    public HttpEntity<?> addRegion(@RequestBody ReqRegion region) {
        ApiResponse apiResponse = filialService.addRegion(region);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/regionList")
    public HttpEntity<?> getRegion() {
        List<ResRegion> region = filialService.getRegion();
        return ResponseEntity.ok(region);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getRegionOfOneCountry(@PathVariable Integer id) {
        List<ResRegion> regionOfOneCountry = filialService.getRegionOfOneCountry(id);
        return ResponseEntity.ok(regionOfOneCountry);
    }

    @PutMapping("/region/{id}")
    public HttpEntity<?> editRegion(@PathVariable Integer id, @RequestBody ReqRegion region) {
        ApiResponse apiResponse = filialService.editRegion(id, region);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @DeleteMapping("/region/{id}")
    public HttpEntity<?> deleteRegion(@PathVariable Integer id) {
        ApiResponse apiResponse = filialService.deleteRegion(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @PostMapping("/addDistrict")
    public HttpEntity<?> addDistrict(@RequestBody ReqDistrict reqDistrict) {
        ApiResponse apiResponse = filialService.addDistrict(reqDistrict);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @GetMapping("/districtList")
    public HttpEntity<?> getDistrict() {
        List<ResDistrict> district = filialService.getDistrict();
        return ResponseEntity.ok(district);
    }

    @GetMapping("/list/{id}")
    public HttpEntity<?> getDistrictOfOneRegion(@PathVariable Integer id) {
        List<ResDistrict> districtOfOneRegion = filialService.getDistrictOfOneRegion(id);
        return ResponseEntity.ok(districtOfOneRegion);
    }

    @PutMapping("/district/{id}")
    public HttpEntity<?> editDistrict(@PathVariable Integer id, @RequestBody ReqDistrict reqDistrict) {
        ApiResponse apiResponse = filialService.editDistrict(id, reqDistrict);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }

    @DeleteMapping("/district/{id}")
    public HttpEntity<?> deleteDistrict(@PathVariable Integer id) {
        ApiResponse apiResponse = filialService.deleteDistrict(id);
        return ResponseEntity.status(apiResponse.isSuccess() ? 200 : 409).body(apiResponse);
    }


}