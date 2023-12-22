
// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });
});

// navbar toggle
$('#nav-toggle').click(function(){
    $(this).toggleClass('is-active')
    $('ul.nav').toggleClass('show');
});

$(document).ready(function() {
    // Fetch pricing data from the JSON file
    $.getJSON('../database/data.json', function(data) {
      const pricingContainer = $('.pricing-wrapper');

      //serivces
      $.each(data.services, function(index, service) {
        var card = `
          <div class="col-md-6 col-lg-3">
            <div class="service-card">
              <div class="body">
                <img src="${service.icon}" alt="${service.title}" class="icon">
                <h6 class="title">${service.title}</h6>
                <p class="subtitle">${service.subtitle}</p>
              </div>
            </div>
          </div>
        `;
        $('#service-cards-wrapper').append(card);
      });
     // pricing
      // Loop through the pricing data and create pricing cards dynamically
      $.each(data.priceData, function(index, item) {
        const card = $('<div class="pricing-card"></div>');
  
        // Construct the card HTML using the data
        card.html(`
          <div class="pricing-card-header d-none">
            <img class="pricing-card-icon" src="${item.icon}" alt="${item.title}">
          </div>
          <div class="pricing-card-body">
            <h6 class="pricing-card-title">${item.title}</h6>
            <div class="pricing-card-list">
              ${item.features.map(feature => `<p>${feature}</p>`).join('')}
            </div>
          </div>
          <div class="pricing-card-footer">
            <span>$</span>
            <span>${item.price}</span>
          </div>
          <a href="#${item.subscribe_url}?subsId=${item.id}" class="btn btn-primary mt-3 pricing-card-btn">Hire Me</a>
        `);
        // Append the card to the pricing container
        pricingContainer.append(card);
      });
      
      //projects
      $.each(data.projects, function(index, item) {
        var card = `
          <div class="col-md-4">
            <a href="${item.url}" class="portfolio-card">
              <img src="${item.imgSrc}" class="portfolio-card-img" alt="Portfolio Image">
              <span class="portfolio-card-overlay">
                <span class="portfolio-card-caption">
                  <h4>${item.title}</h4>
                  <p class="font-weight-normal">${item.category}</p>
                </span>
              </span>
            </a>
          </div>
        `;
        $('#portfolio-cards-wrapper').append(card);
      });
      // testimonials
      $.each(data.testomonials, function(index, item) {
        // Creating HTML structure for testimonial cards
        var testimonialCard = `
          <div class="col-md-6">
            <div class="testimonial-card">
              <div class="testimonial-card-img-holder">
                <img src="${item.img_src}" class="testimonial-card-img" alt="">
              </div>
              <div class="testimonial-card-body">
                <p class="testimonial-card-subtitle">${item.subtitle}</p>
                <h6 class="testimonial-card-title">${item.title}</h6>
              </div>
            </div>
          </div>`;
        
        // Appending the testimonial card HTML to a container element with ID 'testimonial-container'
        $('#testimonial-container').append(testimonialCard);
      });
    })
    .fail(function(error) {
      console.error('Error fetching pricing data:', error);
    });
  });
  

  // handle form submission
  $(document).ready(function() {
    $('.contact-form').submit(function(e) {
        e.preventDefault();

        var $form = $(this);
        var $submitButton = $form.find('input[type="submit"]');
        var $errorField = $form.find('.error-message');
        
        // Disable submit button
        $submitButton.prop('disabled', true).val('Sending...');

        // Collect form data
        var formData = {
            name: $form.find('input[type="text"]').val(),
            email: $form.find('input[type="email"]').val(),
            comment: $form.find('textarea').val()
        };

        // Make API call (dummy example)
        $.ajax({
            type: 'POST',
            url: 'https://webhook.suretriggers.com/suretriggers/b2d5812f-649d-45ae-82bf-30b92ac3204e',
            data: formData,
            success: function(response) {
                // On success, change button text and re-enable
                $submitButton.val('Sent Successfully');
                $submitButton.prop('disabled', false);
            },
            error: function(xhr, status, error) {
                // On error, show error message below the button
                $errorField.text('Data sent successfully!');
                $submitButton.prop('disabled', false).val('Send Message');
            }
        });
    });
});
