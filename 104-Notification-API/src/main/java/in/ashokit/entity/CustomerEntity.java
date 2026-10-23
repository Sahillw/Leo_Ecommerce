package in.ashokit.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Entity
@Table(name = "customer")
@Getter
@Setter
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "customer_id")
    private Integer customerId;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    // Included to map the existing Customer API table; never use this field in notifications.
    @Column(name = "password")
    private String password;

    @Column(name = "pwd_updated")
    private String pwdUpdated;

    @Column(name = "phone_no")
    private String phoneNo;

    @Column(name = "date_created")
    private LocalDate dateCreated;

    @Column(name = "last_updated")
    private LocalDate lastUpdated;
}
