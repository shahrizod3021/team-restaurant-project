package b1.restaurant.restaurant_b1.Service;

import b1.restaurant.restaurant_b1.Entity.Restaurant;
import b1.restaurant.restaurant_b1.Entity.Zakaz;
import b1.restaurant.restaurant_b1.Payload.ResRestaurant;
import b1.restaurant.restaurant_b1.Repository.RestaurantRepository;
import b1.restaurant.restaurant_b1.Repository.ZakazRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
@RequiredArgsConstructor
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    private final ZakazRepository zakazRepository;

    public ResRestaurant getRestaurant() {
        Restaurant restaurant = restaurantRepository.findById(1).orElseThrow(() -> new ResourceNotFoundException("getRestaran"));
        double kunlikFoyda = kunlikFoyda();
        double kechagiFoyda = kechagiFoyda();
        double v6 = 0;
        double v7 = 0;
        double v = kunlikFoyda * 100;
        double v1 = v / kechagiFoyda;
        if (kechagiFoyda > kunlikFoyda) {
            v6 = 100 - v1;
        } else {
            v7 = v1 - 100;
        }
        double oylikFoyda = oylikFoyda();
        double pastMonth = pastMonth();
        double v4 = 0;
        double v5 = 0;
        double v2 = oylikFoyda * 100;
        double v3 = v2 / pastMonth;
        if (pastMonth > oylikFoyda) {
            v4 = 100 - v3;
        } else {
            v5 = v3 - 100;
        }
        return ResRestaurant
                .builder()
                .id(restaurant.getId())
                .name(restaurant.getName())
                .allProfit(restaurant.getProfit())
                .dailyProfit(kunlikFoyda)
                .userSize(restaurant.getUserSize().size())
                .monthlyProfit(oylikFoyda)
                .foydaFoiz(Math.round(v5))
                .zarazFoyiz(Math.round(v4))
                .kunlikFoydaFoiz(kechagiFoyda != 0 ? Math.round(v7) : kunlikFoyda)
                .kunlikZararFoiz(Math.round(v6))
                .build();
    }

    public double kunlikFoyda() {
        double dailyAllProfit = 0;
        Date date = new Date();
        for (Zakaz zakaz : zakazRepository.findAll()) {
            if (zakaz.getDate().getDate() == date.getDate()) {
                if (zakaz.isDelivered()) {
                    dailyAllProfit = dailyAllProfit + zakaz.getAllPrice();
                }
            }
        }
        return dailyAllProfit;
    }

    public double kechagiFoyda() {
        double pastDayProfit = 0;
        Date date = new Date();
        for (Zakaz zakaz : zakazRepository.findAll()) {
            if (zakaz.getDate().getDate() == date.getDate() - 1) {
                if (zakaz.isDelivered()) {
                    pastDayProfit = pastDayProfit + zakaz.getAllPrice();
                }
            }
        }
        return pastDayProfit;
    }

    public double oylikFoyda() {
        double allProfit = 0;
        Date date = new Date();
        for (Zakaz zakaz : zakazRepository.findAll()) {
            if (zakaz.getDate().getMonth() == date.getMonth()) {
                if (zakaz.isDelivered()) {
                    allProfit = allProfit + zakaz.getAllPrice();
                }
            }
        }
        return allProfit;
    }

    public double pastMonth() {
        double pastProfit = 0;
        Date date = new Date();
        int i = date.getMonth() - 1;
        for (Zakaz zakaz : zakazRepository.findAll()) {
            if (i == zakaz.getDate().getMonth()) {
                if (zakaz.isDelivered()) {
                    pastProfit = pastProfit + zakaz.getAllPrice();
                }
            }
        }
        return 100000;
    }
}
