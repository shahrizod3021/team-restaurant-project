package b1.restaurant.restaurant_b1.Controller;

import b1.restaurant.restaurant_b1.Entity.History;
import b1.restaurant.restaurant_b1.Entity.Zakaz;
import b1.restaurant.restaurant_b1.Payload.HistoryDto;
import b1.restaurant.restaurant_b1.Repository.HistoryRepository;
import b1.restaurant.restaurant_b1.Repository.ZakazRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.rest.webmvc.ResourceNotFoundException;
import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/history")
@RequiredArgsConstructor
public class HistoryController {

    private final HistoryRepository historyRepository;

    private final ZakazRepository zakazRepository;
    @GetMapping("/list")
    public HttpEntity<?> getHistory () {
        List<History> all = historyRepository.findAll();
        List<HistoryDto> historyDtos = new ArrayList<>();
        for (History history : all) {
            historyDtos.add(new HistoryDto(history.getId(), history.getName(), history.getDate(), history.getZakaz()));
        }
        return ResponseEntity.ok(historyDtos);
    }

    @GetMapping("/{id}")
    public HttpEntity<?> getProduct(@PathVariable Integer id){
        Zakaz getOrder = zakazRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getOrder"));
        return ResponseEntity.ok(getOrder);
    }
    @GetMapping("/forSale/{id}")
    public HttpEntity<?> getSale(@PathVariable Integer id){
        Zakaz getOrder = zakazRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("getOrder"));
        return ResponseEntity.ok(getOrder.getAksiya());
    }
}
