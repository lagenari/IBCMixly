'use strict';

goog.provide('Blockly.Arduino.Microduino');

goog.require('Blockly.Arduino');

Blockly.Arduino.SensorIRReciverInit = function() {
	var dropdown_pin = this.getFieldValue('Pin');
	Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRmotor.h>\n';
	Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
 
    var branch = Blockly.Arduino.statementToCode(this, 'DO');

 // Blockly.Arduino.definitions_['define_ir_P'] = '#define  BUTTON_POWER   0x1FE48B7';
 // Blockly.Arduino.definitions_['define_ir_A'] = '#define  BUTTON_A       0x1FE807F';
 // Blockly.Arduino.definitions_['define_ir_B'] = '#define  BUTTON_B       0x1FE40BF';
 // Blockly.Arduino.definitions_['define_ir_C'] = '#define  BUTTON_C       0x1FEC03F';
 // Blockly.Arduino.definitions_['define_ir_D'] = '#define  BUTTON_D       0x1FE20DF';
 // Blockly.Arduino.definitions_['define_ir_E'] = '#define  BUTTON_E       0x1FE609F';
 // Blockly.Arduino.definitions_['define_ir_L'] = '#define  BUTTON_LEFT    0x1FEE01F';
 // Blockly.Arduino.definitions_['define_ir_R'] = '#define  BUTTON_RIGHT   0x1FE906F';
 // Blockly.Arduino.definitions_['define_ir_U'] = '#define  BUTTON_UP      0x1FEA05F';
 // Blockly.Arduino.definitions_['define_ir_DO'] = '#define  BUTTON_DOWN    0x1FED827';
 // Blockly.Arduino.definitions_['define_ir_OK'] = '#define  BUTTON_OK      0x1FE10EF';
 // Blockly.Arduino.definitions_['define_ir_BA'] = '#define  BUTTON_BACK    0x1FE50AF';
 // Blockly.Arduino.definitions_['define_ir_VU'] = '#define  BUTTON_VOLUP   0x1FEF807';
 // Blockly.Arduino.definitions_['define_ir_VD'] = '#define  BUTTON_VOLDOWN 0x1FE708F';
 // Blockly.Arduino.definitions_['define_ir_MU'] = '#define  BUTTON_MUTE    0x1FEB04F';
 // Blockly.Arduino.definitions_['define_ir_PL'] = '#define  BUTTON_PLAY    0x1FE30CF\n';
 Blockly.Arduino.definitions_['define_ir_DA'] = 'int32_t irdara=0;\n';

 Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();\n';

 var code='if(irrecv_'+dropdown_pin+'.decode(&results_'+dropdown_pin+')){\n';
 code +='irdara=results_'+dropdown_pin+'.value;\n';
 code+=branch;
 code +='irrecv_'+dropdown_pin+'.resume();\n';
 code +='}\n';
 return code;
};

Blockly.Arduino.Sensor_IRReciverRaw_Key = function() {
	var dropdown_key = this.getTitleValue('CHECK');
	var branch = Blockly.Arduino.statementToCode(this, 'DO');

	var code = 'if(irdara=='+dropdown_key+'){\n';
	code+=branch;
	code +='}\n';
	return code;
};

Blockly.Arduino.SensorIRReciverRaw = function() {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	Blockly.Arduino.definitions_['define_ir_recv'] = '#include <IRremote.h>\n';
	Blockly.Arduino.definitions_['var_ir_recv'+dropdown_pin] = 'IRrecv irrecv_'+dropdown_pin+'('+dropdown_pin+');\ndecode_results results_'+dropdown_pin+';\n';
	if(Blockly.Arduino.setups_['setup_serial_Serial'+profile.default.serial]){
	}else{
		Blockly.Arduino.setups_['setup_serial_Serial'+profile.default.serial] = 'Serial.begin('+profile.default.serial+');'; 
	}
	Blockly.Arduino.setups_['setup_ir_recv_'+dropdown_pin] = 'irrecv_'+dropdown_pin+'.enableIRIn();\n';
	var code='if(irrecv_'+dropdown_pin+'.decode(&results_'+dropdown_pin+')) {\n'
	code += '  '+'dumpRaw(&results_'+dropdown_pin+');\n';
	code +='  irrecv_'+dropdown_pin+'.resume();\n'
	code +='}\n';
	var funcode='void dumpRaw(decode_results *results) {\n' 
	+ '  int count = results->rawlen;\n'
	+ '  Serial.print("RawData (");\n'
	+ '  Serial.print(count, DEC);\n'
	+ '  Serial.print("): ");\n'
	+ '  for (int i = 0; i < count; i++) {\n'
	+ '    Serial.print(results->rawbuf[i]*USECPERTICK, DEC);\n'
	+ '    if(i!=count-1){\n'
	+ '      Serial.print(",");\n'
	+ '    }\n'
	+ '  }\n'
	+ '  Serial.println("");\n'
	+ '}\n';
	Blockly.Arduino.definitions_['dumpRaw'] = funcode;
	return code;
};

Blockly.Arduino.SensorIRReciverEnable = function() {
	var dropdown_pin = Blockly.Arduino.valueToCode(this, 'PIN',Blockly.Arduino.ORDER_ATOMIC);
	var code='';
	code+='irrecv_'+dropdown_pin+'.enableIRIn(); \n';
	return code;
};