/* Examples
  isBlank( '   ' )      => true
  isBlank( null )       => true
  isBlank( undefined )  => true
  isBlank( {} )         => true
  isBlank( [] )         => true
  isBlank( [''] )       => true
  isBlank( 0 )          => true
  isBlank( {k: 1} )     => false
  isBlank( '0' )        => false
  isBlank( ['1'] )      => false
  isBlank( new Date )   => false
*/

export default (value: any): boolean => {
  if (value) {
    if (`${value}`.trim() === '') {
      return true;
      // }else if ( (typeof Immutable !== 'undefined') && Immutable.Iterable.isIterable(value) ){
      //   return value.count() === 0;
    }

    if (value instanceof Date && typeof value.getMonth === 'function') {
      return false;
    }

    if (typeof value === 'object') {
      return Object.keys(value).length === 0;
    }

    if (typeof value !== 'undefined') {
      return false;
    }

    if (typeof value === 'number' && value !== 0) {
      return false;
    }

    return true;
  }

  return true;
};
