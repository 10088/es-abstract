'use strict';

var ES = require('../').ES2018;
var boundES = require('./helpers/createBoundESNamespace')(ES);

var ops = require('../operations/2018');

var expectedMissing = [
	'AddRestrictedFunctionProperties',
	'AddWaiter',
	'agent-order',
	'AgentCanSuspend',
	'AgentSignifier',
	'AllocateArrayBuffer',
	'AllocateSharedArrayBuffer',
	'AllocateTypedArray',
	'AllocateTypedArrayBuffer',
	'AsyncFunctionCreate',
	'AsyncFunctionStart',
	'AsyncGeneratorEnqueue',
	'AsyncGeneratorFunctionCreate',
	'AsyncGeneratorReject',
	'AsyncGeneratorResolve',
	'AsyncGeneratorResumeNext',
	'AsyncGeneratorStart',
	'AsyncGeneratorYield',
	'AsyncIteratorClose',
	'AtomicLoad',
	'AtomicReadModifyWrite',
	'Await',
	'BackreferenceMatcher',
	'BlockDeclarationInstantiation',
	'BoundFunctionCreate',
	'Canonicalize',
	'CaseClauseIsSelected',
	'CharacterRange',
	'CharacterRangeOrUnion',
	'CharacterSetMatcher',
	'CloneArrayBuffer',
	'Completion',
	'ComposeWriteEventBytes',
	'Construct',
	'CopyDataBlockBytes',
	'CreateArrayFromList',
	'CreateArrayIterator',
	'CreateAsyncFromSyncIterator',
	'CreateBuiltinFunction',
	'CreateByteDataBlock',
	'CreateDynamicFunction',
	'CreateIntrinsics',
	'CreateListIteratorRecord',
	'CreateMapIterator',
	'CreateMappedArgumentsObject',
	'CreatePerIterationEnvironment',
	'CreateRealm',
	'CreateResolvingFunctions',
	'CreateSetIterator',
	'CreateSharedByteDataBlock',
	'CreateStringIterator',
	'CreateUnmappedArgumentsObject',
	'Decode',
	'DetachArrayBuffer',
	'Encode',
	'EnqueueJob',
	'EnterCriticalSection',
	'EnumerateObjectProperties',
	'EscapeRegExpPattern',
	'EvalDeclarationInstantiation',
	'EvaluateCall',
	'EvaluateNew',
	'EventSet',
	'ForBodyEvaluation',
	'ForIn/OfBodyEvaluation',
	'ForIn/OfHeadEvaluation',
	'FulfillPromise',
	'FunctionAllocate',
	'FunctionCreate',
	'FunctionDeclarationInstantiation',
	'FunctionInitialize',
	'GeneratorFunctionCreate',
	'GeneratorResume',
	'GeneratorResumeAbrupt',
	'GeneratorStart',
	'GeneratorValidate',
	'GeneratorYield',
	'GetActiveScriptOrModule',
	'GetBase',
	'GetFunctionRealm',
	'GetGeneratorKind',
	'GetGlobalObject',
	'GetIdentifierReference',
	'GetModifySetValueInBuffer',
	'GetModuleNamespace',
	'GetNewTarget',
	'GetReferencedName',
	'GetSuperConstructor',
	'GetTemplateObject',
	'GetThisEnvironment',
	'GetThisValue',
	'GetValue',
	'GetValueFromBuffer',
	'GetViewValue',
	'GetWaiterList',
	'GlobalDeclarationInstantiation',
	'happens-before',
	'HasPrimitiveBase',
	'host-synchronizes-with',
	'HostEnsureCanCompileStrings',
	'HostEventSet',
	'HostPromiseRejectionTracker',
	'HostReportErrors',
	'HostResolveImportedModule',
	'IfAbruptRejectPromise',
	'ImportedLocalNames',
	'InitializeBoundName',
	'InitializeHostDefinedRealm',
	'InitializeReferencedBinding',
	'InnerModuleEvaluation',
	'InnerModuleInstantiation',
	'IntegerIndexedElementGet',
	'IntegerIndexedElementSet',
	'IntegerIndexedObjectCreate',
	'InternalizeJSONProperty',
	'IsAnonymousFunctionDefinition',
	'IsCompatiblePropertyDescriptor',
	'IsDetachedBuffer',
	'IsInTailPosition',
	'IsLabelledFunction',
	'IsPropertyReference',
	'IsSharedArrayBuffer',
	'IsStrictReference',
	'IsSuperReference',
	'IsUnresolvableReference',
	'IsWordChar',
	'LeaveCriticalSection',
	'LocalTime',
	'LoopContinues',
	'MakeArgGetter',
	'MakeArgSetter',
	'MakeClassConstructor',
	'MakeConstructor',
	'MakeMethod',
	'MakeSuperPropertyReference',
	'max',
	'memory-order',
	'min',
	'ModuleDeclarationEnvironmentSetup',
	'ModuleExecution',
	'ModuleNamespaceCreate',
	'NewDeclarativeEnvironment',
	'NewFunctionEnvironment',
	'NewGlobalEnvironment',
	'NewModuleEnvironment',
	'NewObjectEnvironment',
	'NewPromiseCapability',
	'NormalCompletion',
	'NumberToRawBytes',
	'ObjectDefineProperties',
	'OrdinaryCallBindThis',
	'OrdinaryCallEvaluateBody',
	'OrdinaryDelete',
	'OrdinaryGet',
	'OrdinaryIsExtensible',
	'OrdinaryOwnPropertyKeys',
	'OrdinaryPreventExtensions',
	'OrdinarySet',
	'OrdinarySetWithOwnDescriptor',
	'OrdinaryToPrimitive',
	'ParseModule',
	'ParseScript',
	'PerformEval',
	'PerformPromiseAll',
	'PerformPromiseRace',
	'PerformPromiseThen',
	'PrepareForOrdinaryCall',
	'PrepareForTailCall',
	'PromiseReactionJob',
	'PromiseResolveThenableJob',
	'ProxyCreate',
	'PutValue',
	'RawBytesToNumber',
	'reads-bytes-from',
	'reads-from',
	'RegExpAlloc',
	'RegExpBuiltinExec',
	'RegExpCreate',
	'RegExpInitialize',
	'RejectPromise',
	'RemoveWaiter',
	'RemoveWaiters',
	'RepeatMatcher',
	'ResolveBinding',
	'ResolveThisBinding',
	'ReturnIfAbrupt',
	'RunJobs',
	'ScriptEvaluation',
	'ScriptEvaluationJob',
	'SerializeJSONArray',
	'SerializeJSONObject',
	'SerializeJSONProperty',
	'SetDefaultGlobalBindings',
	'SetImmutablePrototype',
	'SetRealmGlobalObject',
	'SetValueInBuffer',
	'SetViewValue',
	'SharedDataBlockEventSet',
	'SortCompare',
	'SplitMatch',
	'StringCreate',
	'Suspend',
	'synchronizes-with',
	'ThrowCompletion',
	'TimeZoneString',
	'TopLevelModuleEvaluationJob',
	'TriggerPromiseReactions',
	'TypedArrayCreate',
	'TypedArraySpeciesCreate',
	'UnicodeMatchProperty',
	'UnicodeMatchPropertyValue',
	'UpdateEmpty',
	'UTC', // depends on LocalTZA'UTC',
	'ValidateAtomicAccess',
	'ValidateSharedIntegerTypedArray',
	'ValidateTypedArray',
	'ValueOfReadEvent',
	'WakeWaiter',
	'WordCharacters' // depends on Canonicalize
];

require('./tests').es2018(boundES, ops, expectedMissing);

require('./helpers/runManifestTest')(require('tape'), ES, 2018);
