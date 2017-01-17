const injections = {};

injections.username = $('meta[name="cassiny-username"]').attr('value');

$('script.cassiny-injection').each((i, element) => {
  const $element = $(element);
  if ($element.data('key')) {
    injections[$element.data('key')] = JSON.parse($element.html());
  }
});

export default injections;
