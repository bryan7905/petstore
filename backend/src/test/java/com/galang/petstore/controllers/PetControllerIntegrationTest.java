package com.galang.petstore.controllers;

import com.galang.petstore.models.Pet;
import com.galang.petstore.models.Species;
import com.galang.petstore.services.PetService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.Arrays;
import java.util.Collections;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class PetControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private PetService petService;

    @Test
    void testGetPets() throws Exception {
        Pet pet = new Pet();
        pet.setId(1L);
        pet.setName("Buddy");
        pet.setSpecies(Species.DOG);
        pet.setPrice(new BigDecimal("299.99"));

        when(petService.getAllPets(null)).thenReturn(Arrays.asList(pet));

        mockMvc.perform(get("/galang/v1/pets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].name").value("Buddy"))
                .andExpect(jsonPath("$[0].species").value("DOG"));
    }

    @Test
    void testFilterPets() throws Exception {
        Pet dog = new Pet();
        dog.setId(1L);
        dog.setName("Buddy");
        dog.setSpecies(Species.DOG);

        when(petService.getAllPets(Species.DOG)).thenReturn(Arrays.asList(dog));

        mockMvc.perform(get("/galang/v1/pets").param("species", "DOG"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].species").value("DOG"))
                .andExpect(jsonPath("$.length()").value(1));
    }

    @Test
    void testEmptyPets() throws Exception {
        when(petService.getAllPets(null)).thenReturn(Collections.emptyList());

        mockMvc.perform(get("/galang/v1/pets"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(0));
    }
}
