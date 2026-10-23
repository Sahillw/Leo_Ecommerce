package in.ashokit.repo;

import in.ashokit.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface OrderRepository extends JpaRepository<OrderEntity, Integer> {
    List<OrderEntity> findByDeliveyDate(LocalDate deliveyDate);
    List<OrderEntity> findByOrderStatusIgnoreCase(String orderStatus);
}
