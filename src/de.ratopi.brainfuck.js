/*
Written by Ralf Th. Pietsch <ratopi@abwesend.de> in 2013
License: http://creativecommons.org/licenses/by-nc-sa/3.0/
*/

// --- package creation ...

var de = de = de || {};
de.ratopi = de.ratopi || {};

// --- package interface definition

de.ratopi.brainfuck = function( programText, options )
{
	// ==== initial setup ====

	var preferences = {
		"out": out
	};

	copyAttribute( 'out', options, preferences );

	var charPointer;

	var pointer = 0;
	var memory = [ 0 ];

	var loopStarts = [];

	var handlers = {
		'.': doPrint,
		',': doInput,
		'+': doIncrement,
		'-': doDecrement,
		'<': doMoveLeft,
		'>': doMoveRight,
		'[': doLoopStart,
		']': doLoopEnd
	};

	// ==== interface ====

	return {
		"run": run
	};

	// ==== interface functions ====

	function run()
	{
		pointer = 0;
		commandPointer = 0;

		charProvider = createCharProvider( programText );

		var command = charProvider.nextChar();
		while ( command )
		{
			// console.log( "# " + command );
			var handler = handlers[ command ];
			if ( handler )
			{
				handler();
			}
			else
			{
				console.log( "CAN NOT HANDLE '" + ch + "'" );
			}
            command = charProvider.nextChar();
		}
	}

	// ==== private functions ====

	function doPrint()
	{
		preferences.out( "" + memory[ pointer ] );
	}

	function doInput()
	{
	}

	function doIncrement()
	{
		memory[ pointer ]++;
		// printMemory();
	}

	function doDecrement()
	{
		memory[ pointer ]--;
		// printMemory();
	}

	function doMoveLeft()
	{
		pointer--;
		if ( pointer < 0 )
		{
			console.log( "MEMORY UNDERFLOW" );
			pointer = 0;
		}
	}

	function doMoveRight()
	{
		pointer++;
		while ( memory.length <= pointer )
		{
			memory.push( 0 );
		}
	}

	function doLoopStart()
	{
		var x = function ( p )
		{
			loopStarts.push( p );
		}( charProvider.getPointer() );
	}

	function doLoopEnd()
	{
		if ( memory[ pointer ] == 0 )
        {
            loopStarts.pop();
        }
        else
        {
            charProvider.setPointer( loopStarts[ 0 ] );
        }
	}

	// ---

	function out( character )
	{
        console.log( "out: " + String.fromCharCode( character ) + " (" + character + ")" );
        $( '#output' ).text( $( '#output' ).text() + String.fromCharCode( character ) );
	}

	// ---

	function copyAttribute( key, get, set )
	{
		if ( get  &&  get[ key ] )
		{
			set[ key ] = get[ key ];
		}
	}

	// ---

	function createCharProvider( text )
	{
		var pos = -1;

		function nextChar()
		{
			pos++;
			if ( pos >= text.length ) return null;

			return text.charAt( pos );
		}

		function getPointer()
		{
			return pos;
		}

		function setPointer( pointer )
		{
			pos = pointer - 1;
		}

        return {
            "nextChar": nextChar,
            "getPointer": getPointer,
            "setPointer": setPointer
        }
	}
	
	// ---
	
	function printMemory()
	{
		var text = "";
		for ( var i = 0; i < memory.length; i++ )
		{
			text += memory[ i ] + ",";
		}
		
		console.log( "memory: " + text );
	}
	
};

